import { jsonFetch } from './utils/dataUtils.js';

window.onload = () => {
  document.getElementById('loginButton').addEventListener('click', login);
};


async function login() {
  const userName = document.getElementById('userNameInput').value;
  const password = document.getElementById('passwordInput').value;

  const res = await jsonFetch(`/user/${userName}/session`, 'POST', { password });
  if (res.status === 200) {
    window.localStorage.setItem('session', await res.json().then(x => JSON.stringify(x.session)));
  } else {
    alert('Invalid username or password.');
  }
  
  // Redirect user to feed.
  window.location.replace(`/html/index.html`);
}
