if (sessionStorage.getItem('token')) {
  window.addEventListener('load', () => {
    const submit = document.getElementById('submit');
    const errorResponse = document.getElementById('errorResponse');

    const date = new Date();
    errorResponse.innerText = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    errorResponse.style.color = '#142B44';
    // Attach an event listener on the submit button
    submit.addEventListener('click', (event) => {
      // Set up entry points
      const title = document.getElementById('title').value;
      const details = document.getElementById('details').value;

      submit.value = '';
      submit.style.background = '#FEEF6D url(images/Spinner-1s.gif) no-repeat center';

      const request = {
        title,
        details
      };

      fetch('https://morning-falls-51849.herokuapp.com/api/v1/entries', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(request)
      })
        .then(resp => resp.json())
        .then((data) => {
          if (data.status === 200 || data.status === 201) {
            console.log(request, data);
            window.location.href = 'dashboard.html';
            console.log('a');
          } else {
            console.log(data);
            errorResponse.innerText = data.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // Prevent Default
      event.preventDefault();
    });
  });
} else {
  window.location.href = 'index.html';
}