const signUpFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector(`#usernameSignup`).value.trim();
  const email = document.querySelector(`#emailSignup`).value.trim();
  const password = document.querySelector(`#passwordSignup`).value.trim();

  if(username && email && password) {
    const response = await fetch(`/api/users`, {
      method: `POST`,
      body: JSON.stringify({username, email, password}),
      headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
      document.location.replace(`/`);
    } else {
      alert(`Failed To Sign Up.`);
    }
  }
};

document.querySelector(`.signup-form`).addEventListener(`click`, signUpFormHandler);