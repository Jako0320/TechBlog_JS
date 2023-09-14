// Create new post
async function createPostHandler(event) {
  event.preventDefault();

  document.location.replace('/dashboard/new');
}

document
  .querySelector('#create-new-post')
  .addEventListener('click', createPostHandler);

// Add new post
const createNewPost = async (title, content) => {
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const postData = await response.json();
      console.log('New post created:', postData);
    } else {
      console.error('Error creating a new post:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating a new post:', error.message);
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

// Delete post
async function deleteFormHandler(event) {
  event.preventDefault();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.delete-post-btn')
  .addEventListener('click', deleteFormHandler);

// Edit post
async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document
    .querySelector('textarea[name="post-content"]')
    .value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);

// Submit a new comment
const submitComment = async (postId, commentContent) => {
  try {
    const response = await fetch(`/api/users/comments/${postId}`, {
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
document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
