if (sessionStorage.getItem('token')) {
  // Check first if a token exists. if it doesn't refer back to login
  window.addEventListener('load', () => {
    const signOut = document.getElementById('signOut'),
      entriesNumber = document.getElementById('entries'),
      timeValue = document.getElementById('time'),
      loadingModal = document.getElementById('loadingModal'),
      errorResponse = document.getElementById('error'),
      set = document.getElementById('set'),
      deleteReminder = document.getElementById('delete'),
      reminder = document.getElementById('reminder');


    // While page is loading
    loadingModal.style.display = 'block';

    // After page loads, get current entries total
    entriesNumber.innerHTML = `You have a total of ${sessionStorage.getItem('entriesTotal')} entries`;

    // Then get the current reminder settings
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
          if (data.data.reminder === null) {
            loadingModal.style.animation = 'fadeOut 2s ease 0s 1 forwards';
            deleteReminder.disabled = true;
            reminder.innerText = 'You currently have no reminder set up, Would you like one?';
          } else {
            loadingModal.style.animation = 'fadeOut 2s ease 0s 1 forwards';
            reminder.innerText = `Your current reminder setting is for ${data.data.reminder} daily`;
          }
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Create a click event to set the reminder
    set.addEventListener('click', (event) => {
      event.preventDefault();

      const time = timeValue.value;
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
            errorResponse.innerText = `New Reminder set for ${data.data}`;
            reminder.innerText = `Your current reminder setting is for ${data.data} daily`;
            window.location.href = 'profile.html';
          } else {
            console.log(data);
            errorResponse.innerText = 'Error Creating reminder, Please try again';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // Attach a click event to delete the user's reminder settings
    deleteReminder.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('a');
      fetch('https://morning-falls-51849.herokuapp.com/api/v1/auth/reminder/', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
        .then(resp => resp.json())
        .then((response) => {
          if (response.status === 200) {
            window.location.href = 'profile.html';
            errorResponse.innerText = 'Entry deleted successfully';
          } else {
            errorResponse.innerText = response.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    signOut.addEventListener('click', () => {
      signOut.style.content = '';
      signOut.style.background = 'rgb(20, 43, 68) url(images/Spinner-1s.gif) no-repeat center';
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  });
} else {
  window.location.href = 'index.html';
}