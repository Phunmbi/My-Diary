// While the page loads up the modal should be in display
const loadingModal = document.getElementById('loadingModal');
loadingModal.style.display = 'block';

if (sessionStorage.getItem('token')) {
  // Check first if a token exists. if it doesn't refer back to login
  window.addEventListener('load', () => {
    const signOut = document.getElementById('signOut'),
      entriesNumber = document.getElementById('entries'),
      timeValue = document.getElementById('time'),
      responseModal = document.getElementById('responseModal'),
      responseText = document.getElementById('response'),
      errorResponse = document.getElementById('error'),
      set = document.getElementById('set'),
      deleteReminder = document.getElementById('delete'),
      reminder = document.getElementById('reminder');

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

      // Create loading animation on button
      set.value = '';
      set.style.background = '#FEEF6D url(images/Spinner-1s.gif) no-repeat center';
      const time = timeValue.value;

      // Create request object to be sent only if input isn't empty.
      if (time.trim().length === 0) {
        set.value = 'Set Reminder';
        set.style.background = '#FEEF6D';
        responseText.style.color = 'red';
        responseText.innerText = 'Please set a valid time for your reminder';
        responseModal.style.display = 'block';
        responseModal.style.animation = 'fadeOut 4s ease 0s 1 forwards';
      } else {
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
              set.value = 'Set Reminder';
              set.style.background = '#FEEF6D';
              deleteReminder.disabled = false;
              responseText.innerText = `Your current reminder setting is for ${data.data} daily`;
              responseModal.style.display = 'block';
              responseModal.style.animation = 'fadeOut 3s ease 0s 1 forwards';
              reminder.innerText = `Your current reminder setting is for ${data.data} daily`;
            } else {
              console.log(data);
              errorResponse.innerText = 'Error Creating reminder, Please try again';
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    // Attach a click event to delete the user's reminder settings
    deleteReminder.addEventListener('click', (event) => {
      event.preventDefault();

      deleteReminder.value = '';
      deleteReminder.style.background = '#FEEF6D url(images/Spinner-1s.gif) no-repeat center';

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
            deleteReminder.value = 'Delete Reminder';
            deleteReminder.style.background = '#FEEF6D';
            responseText.style.color = 'red';
            responseText.innerText = `Your current reminder setting is for ${response.message} daily`;
            responseModal.style.display = 'block';
            responseModal.style.animation = 'fadeOut 3s ease 0s 1 forwards';
            deleteReminder.disabled = true;
            reminder.innerText = 'You currently have no reminder set up, Would you like one?';
          } else {
            errorResponse.innerText = response.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    signOut.addEventListener('click', () => {
      signOut.innerHTML = '';
      signOut.style.background = 'rgb(20, 43, 68) url(images/Spinner-1s.gif) no-repeat center';

      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  });
} else {
  window.location.href = 'index.html';
}