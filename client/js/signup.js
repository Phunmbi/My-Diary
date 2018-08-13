window.addEventListener('load', () => {
  const submit = document.getElementById('submit');

  // Attach an event listener on the submit button
  submit.addEventListener('click', (event) => {
    // Set up entry points
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const errorResponse = document.getElementById('errorResponse');
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Prevent Default
    event.preventDefault();


    // Setup form validation
    if (!firstName || firstName.trim().length < 1) {
      errorResponse.innerText = 'Please enter your First Name';
    } else if (firstName === 'true' || firstName === 'false') {
      errorResponse.innerText = 'Please enter an acceptable First Name';
    } else if (!lastName || lastName.trim().length < 1) {
      errorResponse.innerText = 'Please enter your Last Name';
    } else if (lastName === 'true' || lastName === 'false') {
      errorResponse.innerText = 'Please enter an acceptable Last Name';
    } else if (email.search('.com') === -1 || email.search('@') === -1) {
      errorResponse.innerText = 'Please enter an accurate Email';
    } else if (!password || password.trim().length < 1) {
      errorResponse.innerText = 'Please enter your Password';
    } else if (!password || password.trim().length < 8) {
      errorResponse.innerText = 'Your password must be at least 8 characters lont';
    } else if (!confirmPassword) {
      errorResponse.innerText = 'Please confirm your Password';
    } else if (confirmPassword !== password) {
      errorResponse.innerText = 'Please enter consistent passwords';
    } else {
      if (firstName && firstName !== 'true' && firstName !== 'false') {
        firstName = firstName.toLowerCase().trim();
        if (lastName && lastName !== 'true' && lastName !== 'false') {
          lastName = lastName.toLowerCase().trim();
          if (email && email.search('.com') !== -1 && email.search('@') !== -1) {
            email = email.toLowerCase().trim();
            if (password && password.trim().length >= 8) {
              password = password.trim();

              submit.value = '';
              submit.style.background = '#FEEF6D url(images/Spinner-1s.gif) no-repeat center';

              const request = {
                firstName,
                lastName,
                email,
                password
              };

              fetch('https://morning-falls-51849.herokuapp.com/api/v1/auth/signup', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(request)
              })
                .then(resp => resp.json())
                .then((data) => {
                  if (data.status === 201) {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('firstName', data.data.lastName);
                    sessionStorage.setItem('lastName', data.data.firstName);
                    window.location.href = 'dashboard.html';
                  } else {
                    errorResponse.innerText = data.message;
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        }
      }
    }
  });
});