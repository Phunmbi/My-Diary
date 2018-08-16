if (sessionStorage.getItem('token')) {
  window.addEventListener('load', () => {
    const signOut = document.getElementById('signOut'),
      entriesNumber = document.getElementById('entries'),
      timeValue = document.getElementById('time'),
      set = document.getElementById('set'),
      reminder = document.getElementById('reminder');

    entriesNumber.innerHTML = `You have a total of ${sessionStorage.getItem('entriesTotal')} entries`;
    fetch('https://morning-falls-51849.herokuapp.com/api/v1/auth/reminder', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data);
          reminder.innerText = `Your current reminder setting is for ${data.data.reminder} daily`;
        } else {
          console.log(data);
          reminder.innerText = 'You current have no reminder setting';
        }
      })
      .catch((err) => {
        console.log(err);
      });

    set.addEventListener('click', (event) => {
      event.preventDefault();

      const time = timeValue.value;
      console.log(time);
      const request = {
        time
      };

      fetch('https://morning-falls-51849.herokuapp.com/api/v1/auth/reminder', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(request)
      })
        .then(resp => resp.json())
        .then((data) => {
          if (data.status === 201) {
            console.log(request, data);
            reminder.innerText = `Your current reminder setting is for ${data.data} daily`;
          } else {
            console.log(data);
            // errorResponse.innerText = data.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    signOut.addEventListener('click', () => {
      signOut.value = '';
      signOut.style.background = 'rgb(20, 43, 68) url(images/Spinner-1s.gif) no-repeat center';
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  });
} else {
  window.location.href = 'index.html';
}