const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector(`#comment-content`).value.trim();
  const post = document.getElementById(`post-card`);

  //getting the post's id
  const postId = post.getAttribute(`data-id`);

  // console.log(typeof(postId));

  if(commentContent && postId) {
    const response = await fetch(`/api/comments`, {
      method: `POST`,
      body: JSON.stringify({commentContent, postId}),
      headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
      document.location.reload();
    } else {
      alert(`Failed To Upload Comment.`);
    }
  }
};

document.querySelector(`.addcomment-form`).addEventListener(`submit`, commentFormHandler);