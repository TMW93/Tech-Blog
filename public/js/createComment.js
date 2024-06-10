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

const buttonsDiv = document.getElementById(`buttons-div`);
const updateButton = document.getElementById(`update-button`);
const updateFormCard = document.getElementById(`updatepost-card`);

const buttonsDivCheck = buttonsDiv.getAttribute(`data-id`);
const updateButtonCheck = updateButton.getAttribute(`data-id`);

const updateButtonHandler = async () => {
  updateFormCard.classList.remove(`d-none`);
};

if(buttonsDivCheck === updateButtonCheck) {
  buttonsDiv.classList.remove(`d-none`);
  updateButton.classList.remove(`d-none`);
}

document.getElementById(`update-button`).addEventListener(`click`, updateButtonHandler);