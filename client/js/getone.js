if (sessionStorage.getItem('token')) {
  window.addEventListener('load', () => {
    const title = document.getElementById('title');
    const date = document.getElementById('date');
    const details = document.getElementById('details');
    const errorResponse = document.getElementById('response');

    const display = (entry) => {
      title.innerText = entry.title;
      date.innerText = entry.time_created.slice(0, 10);
      details.innerText = entry.details;
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
        if (data.status === 200 || data.status === 200) {
          console.log(data.data);
          display(data.data);
        } else {
          errorResponse.innerText = data.message;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
} else {
  window.location.href = 'index.html';
}