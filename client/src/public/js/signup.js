import { jsonFetch } from './utils/dataUtils.js';

window.onload = () => {
  document.getElementById('signupSubmitButton').addEventListener('click', signup);
};


async function signup() {
  const userName = document.getElementById('userNameInput').value;
  const password = document.getElementById('passwordInput').value;
  const firstName = document.getElementById('firstNameInput').value;
  const lastName = document.getElementById('lastNameInput').value;

  if (userName.length > 12 || userName.length < 6) {
    alert('Username must be between 6 and 12 characters.');
  } else if (password.length > 12 || password.length < 6) {
    alert('Password must be between 6 and 12 characters.');
  } else if (firstName.length > 20 || firstName.length === 0) {
    alert('First name must be between 1 and 20 characters.');
  } else if (lastName.length > 20 || lastName.length === 0) {
    alert('Last name must be between 1 and 20 characters.');
  } else {
    const res = await jsonFetch('/user/new', 'POST', {
      userName,
      password,
      firstName,
      lastName
    });
  
    if (res.status === 201) {
      alert('Sign up successful!');
    } else if (res.status === 409) {
      alert(`Username '${userName}' already in use.`);
    } else {
      alert('Sign up failed.');
    }
  }
}