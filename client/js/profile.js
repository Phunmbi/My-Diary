const signOut = document.getElementById('signOut');

signOut.addEventListener('click', () => {
  signOut.value = '';
  signOut.style.background = 'rgb(20, 43, 68) url(images/Spinner-1s.gif) no-repeat center';
  sessionStorage.clear();
  window.location.href = 'index.html';
});