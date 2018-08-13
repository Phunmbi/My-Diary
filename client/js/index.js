window.addEventListener('load', () => {
  const submit = document.getElementById('submit');

  // Attach an event listener on the submit button
  submit.addEventListener('click', (event) => {
    // Set up entry points
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const errorResponse = document.getElementById('errorResponse');

    // Prevent Default
    event.preventDefault();

    // Setup form validation
    if (email.search('.com') === -1 || email.search('@') === -1) {
      errorResponse.innerText = 'Please enter an accurate Email';
    } else if (!password || password.trim().length < 1) {
      errorResponse.innerText = 'Please enter your Password';
    } else if (!password || password.trim().length < 8) {
      errorResponse.innerText = 'Your password must be at least 8 characters lont';
    } else {
      if (email && email.search('.com') !== -1 && email.search('@') !== -1) {
        email = email.toLowerCase().trim();
        if (password && password.trim().length >= 8) {
          password = password.trim();

          submit.value = '';
          submit.style.background = '#FEEF6D url(images/Spinner-1s.gif) no-repeat center';

          const request = {
            email,
            password
          };

          fetch('https://morning-falls-51849.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(request)
          })
            .then(resp => resp.json())
            .then((data) => {
              if (data.status === 200) {
                document.body.style.animation = 'fadeOut 2s ease 0s 1 forwards';
                sessionStorage.setItem('token', data.tokenize);
                sessionStorage.setItem('firstName', data.data.lastName);
                sessionStorage.setItem('lastName', data.data.firstName);
                window.location.href = 'dashboard.html';
              } else {
                errorResponse.innerText = data.message;
                submit.value = 'Submit';
                submit.style.background = '#FEEF6D';
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  });
});