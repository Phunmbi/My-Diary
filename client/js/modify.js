// While the page loads up the modal should be in display
const loadingModal = document.getElementById('loadingModal');
loadingModal.style.display = 'block';

window.addEventListener('load', () => {
  const oldTitle = document.getElementById('title');
  const submit = document.getElementById('submit');
  const oldDetails = document.getElementById('details');
  const errorResponse = document.getElementById('errorResponse');

  const display = (entry) => {
    oldTitle.value = entry.title;
    oldDetails.value = entry.details;
  };

  fetch(`https://morning-falls-51849.herokuapp.com/api/v1/entries/${sessionStorage.getItem('entryId')}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === 200) {
        loadingModal.style.animation = 'fadeOut 2s ease 0s 1 forwards';
        display(data.data);
      } else {
        window.location.href = 'index.html';
        errorResponse.innerText = data.message;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Attach an event listener on the submit button
  submit.addEventListener('click', (event) => {
    event.preventDefault();

    submit.value = '';
    submit.style.background = '#FEEF6D url(images/Spinner-1s.gif) no-repeat center';

    const request = {
      title: oldTitle.value,
      details: oldDetails.value
    };

    console.log(request);
    fetch(`https://morning-falls-51849.herokuapp.com/api/v1/entries/${sessionStorage.getItem('entryId')}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(request)
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(request, data);
          window.location.href = 'dashboard.html';
          console.log('a');
        } else if (data.status === 403) {
          errorResponse.innerText = data.message;
          setTimeout(() => { window.location.href = 'dashboard.html'; }, 4000);
        } else {
          errorResponse.innerText = data.message;
          setTimeout(() => { window.location.href = 'dashboard.html'; }, 4000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});