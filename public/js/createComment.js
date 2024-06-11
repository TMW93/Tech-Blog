// adding a comment
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

// updating a post
const buttonsDiv = document.getElementById(`buttons-div`);
const updateButton = document.getElementById(`update-button`);
const updateFormCard = document.getElementById(`updatepost-card`);
const closeUpdate = document.getElementById(`close-update`);
const delButton = document.getElementById(`delete-post`);

const buttonsDivCheck = buttonsDiv.getAttribute(`data-id`);
const updateButtonCheck = updateButton.getAttribute(`data-id`);

// making sure user created the post to show update button
if(buttonsDivCheck === updateButtonCheck) {
  buttonsDiv.classList.remove(`d-none`);
  updateButton.classList.remove(`d-none`);
  delButton.classList.remove(`d-none`);
};

// showing updating form on click
document.getElementById(`update-button`).addEventListener(`click`, () => {
  updateFormCard.classList.remove(`d-none`);
});

// closing form on click 
closeUpdate.addEventListener(`click`, () => {
  updateFormCard.classList.add(`d-none`);
});

// updating a post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const updateTitle = document.querySelector(`#update-title`).value.trim();
  const updateContent = document.querySelector(`#update-content`).value.trim();
  const post = document.getElementById(`post-card`);

  const postId = parseInt(post.getAttribute(`data-id`));

  if(updateTitle && updateContent && postId) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: `PUT`,
      body: JSON.stringify({updateTitle, updateContent}),
      headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert(`Failed To Update Post.`);
    }
  }
};

document.querySelector(`.updatepost-form`).addEventListener(`submit`, updateFormHandler);

// deleting a post
const deletePostHandler = async () => {
  const post = document.getElementById(`post-card`);

  const postId = parseInt(post.getAttribute(`data-id`));

  if(postId) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: `DELETE`,
    });

    if(response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert(`Failed To Delete Post.`);
    }
  }
};

delButton.addEventListener(`click`, deletePostHandler);