async function createPostHandler(event) {
    event.preventDefault();

    document.location.replace('/dashboard/newPost')
}


document.querySelector('#createNewPost').addEventListener('click', createPostHandler);