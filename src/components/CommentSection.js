import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import styles from './styles/CommentSection.module.css';

function CommentSection({ commentableType, commentableId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [commentCount, setCommentCount] = useState(0);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.comments.getAll(commentableType, commentableId, { page, limit: 20 });
      if (response.success) {
        if (page === 1) {
          setComments(response.comments);
        } else {
          setComments(prev => [...prev, ...response.comments]);
        }
        setHasMore(page < response.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  }, [commentableType, commentableId, page]);

  const fetchCount = useCallback(async () => {
    try {
      const response = await api.comments.getCount(commentableType, commentableId);
      if (response.success) {
        setCommentCount(response.count);
      }
    } catch (error) {
      console.error('Failed to fetch comment count:', error);
    }
  }, [commentableType, commentableId]);

  useEffect(() => {
    fetchComments();
    fetchCount();
  }, [commentableType, commentableId, page, fetchComments, fetchCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || posting) return;
    if (!user) {
      alert('Please sign in to comment');
      return;
    }

    setPosting(true);
    try {
      const response = await api.comments.create({
        content: newComment.trim(),
        commentableType,
        commentableId,
      });
      if (response.success) {
        setComments(prev => [response.comment, ...prev]);
        setNewComment('');
        setCommentCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
      alert('Failed to post comment');
    } finally {
      setPosting(false);
    }
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyText.trim() || posting) return;
    if (!user) {
      alert('Please sign in to reply');
      return;
    }

    setPosting(true);
    try {
      const response = await api.comments.create({
        content: replyText.trim(),
        commentableType,
        commentableId,
        parentComment: parentId,
      });
      if (response.success) {
        setComments(prev => prev.map(c => {
          if (c._id === parentId) {
            return { ...c, replies: [...(c.replies || []), response.comment] };
          }
          return c;
        }));
        setReplyingTo(null);
        setReplyText('');
        setCommentCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to post reply:', error);
      alert('Failed to post reply');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (commentId, currentLikes, currentlyLiked) => {
    if (!user) {
      alert('Please sign in to like');
      return;
    }
    try {
      const response = await api.comments.like(commentId);
      if (response.success) {
        setComments(prev => prev.map(c => {
          if (c._id === commentId) {
            return { ...c, likes: response.likes, likedByCurrentUser: response.liked };
          }
          if (c.replies) {
            return { ...c, replies: c.replies.map(r => 
              r._id === commentId ? { ...r, likes: response.likes, likedByCurrentUser: response.liked } : r
            )};
          }
          return c;
        }));
      }
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const renderComment = (comment, depth = 0) => (
    <div key={comment._id} className={`${styles.comment} ${styles[`depth${Math.min(depth, 3)}`]}`}>
      <div className={styles.commentHeader}>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>
            {comment.author?.avatar || comment.author?.fullName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <span className={styles.authorName}>{comment.author?.fullName || 'Unknown'}</span>
            <span className={styles.commentTime}>{formatDate(comment.createdAt)}</span>
          </div>
        </div>
        {comment.author?._id === user?.id && (
          <div className={styles.commentActions}>
            <button className={styles.actionBtn} onClick={() => setReplyingTo(comment._id)}>Reply</button>
            <button className={styles.actionBtn} onClick={() => {}}>Edit</button>
            <button className={styles.actionBtn} onClick={() => {}}>Delete</button>
          </div>
        )}
      </div>
      <p className={styles.commentContent}>{comment.content}</p>
      <div className={styles.commentFooter}>
        <button 
          className={`${styles.likeBtn} ${comment.likedByCurrentUser ? styles.liked : ''}`}
          onClick={() => handleLike(comment._id, comment.likes, comment.likedByCurrentUser)}
        >
          👍 {comment.likes}
        </button>
        {comment.replies && comment.replies.length > 0 && (
          <span className={styles.replyCount}>{comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map(reply => renderComment(reply, depth + 1))}
        </div>
      )}

      {replyingTo === comment._id && (
        <form className={styles.replyForm} onSubmit={(e) => { e.preventDefault(); handleReplySubmit(comment._id); }}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className={styles.replyInput}
            rows={2}
          />
          <div className={styles.replyActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => { setReplyingTo(null); setReplyText(''); }}>Cancel</button>
            <button type="submit" className={styles.submitBtn} disabled={posting || !replyText.trim()}>
              {posting ? 'Posting...' : 'Reply'}
            </button>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div className={styles.commentSection}>
      <h3 className={styles.sectionTitle}>
        Comments <span className={styles.count}>({commentCount})</span>
      </h3>

      {user ? (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <div className={styles.avatar}>
            {user.avatar || user.fullName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className={styles.formContent}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className={styles.commentInput}
              rows={3}
              disabled={posting}
            />
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitBtn} disabled={posting || !newComment.trim()}>
                {posting ? 'Posting...' : 'Comment'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.signInPrompt}>
          <p>Please <a href="/signin">sign in</a> to comment</p>
        </div>
      )}

      <div className={styles.commentsList}>
        {loading && page === 1 ? (
          <div className={styles.loading}>Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className={styles.empty}>No comments yet. Be the first to comment!</div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>

      {hasMore && !loading && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load more comments
        </button>
      )}

      {loading && page > 1 && <div className={styles.loading}>Loading more...</div>}
    </div>
  );
}

export default CommentSection;