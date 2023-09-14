// Submit a new comment
const submitComment = async (postId, commentContent) => {
    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ content: commentContent }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const commentData = await response.json();
        const commentElement = createCommentElement(commentData);
        document.getElementById('comments-section').appendChild(commentElement);
  
        document.getElementById('comment-content').value = '';
      } else {
        console.error('Error adding comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };
  
  // Create a new comment element
  const createCommentElement = (commentData) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <p>${commentData.content}</p>
      <p>Posted by: ${commentData.username}</p>
      <p>Posted at: ${commentData.createdAt}</p>
    `;
    return commentElement;
  };
  
  // Event listener for new comment
  document.getElementById('comment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const postId = event.target.dataset.postId;
    const commentContent = document.getElementById('comment-content').value;
    if (commentContent) {
      submitComment(postId, commentContent);
    }
  });
  