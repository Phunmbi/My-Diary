// While the page loads up the modal should be in display
const loadingModal = document.getElementById('loadingModal');
loadingModal.style.display = 'block';

window.addEventListener('load', () => {
  const errorResponse = document.getElementById('response');
  const section = document.getElementById('section');
  const deleteModal = document.getElementById('deleteModal');
  const noButton = document.getElementById('no-button');
  const yesButton = document.getElementById('yes-button');


  const createCard = (data) => {
    // Create elements that make up a card

    const card = document.createElement('div'),
      cardTitle = document.createElement('div'),
      cardDetails = document.createElement('div'),
      cardActions = document.createElement('div'),
      titleText = document.createElement('p'),
      date = document.createElement('p'),
      details = document.createElement('p'),
      editImg = document.createElement('img'),
      deleteImg = document.createElement('img');

    // Set their classes and attributes

    card.className = 'card';
    card.setAttribute('id', data.id);
    cardTitle.className = 'card-title';
    cardDetails.className = 'card-details';
    cardActions.className = 'card-actions';
    titleText.setAttribute('id', 'cardTitleText');
    editImg.setAttribute('src', 'images/icons8-pencil-26.png');
    editImg.setAttribute('alt', 'edit');
    editImg.className = 'clickIcons';
    deleteImg.setAttribute('src', 'images/icons8-trash-26.png');
    deleteImg.setAttribute('alt', 'delete');
    deleteImg.className = 'clickIcons';

    // Set their values

    if (data.title.length >= 23) {
      titleText.innerText = `${data.title.slice(0, 24)}...`;
    } else {
      titleText.innerText = data.title;
    }
    date.innerText = data.time_created.slice(0, 10);
    if (data.details.length >= 200) {
      details.innerText = `${data.details.slice(0, 200)}...`;
    } else {
      details.innerText = data.details;
    }

    // Implement correct card structure
    cardTitle.appendChild(titleText);
    cardTitle.appendChild(date);
    cardDetails.appendChild(details);
    cardActions.appendChild(editImg);
    cardActions.appendChild(deleteImg);
    card.appendChild(cardTitle);
    card.appendChild(cardDetails);
    card.appendChild(cardActions);
    section.appendChild(card);

    // Add event listeners
    cardDetails.addEventListener('click', () => {
      sessionStorage.setItem('entryId', data.id);
      window.location.href = 'view.html';
    });

    editImg.addEventListener('click', () => {
      sessionStorage.setItem('entryId', data.id);
      window.location.href = 'edit.html';
    });

    deleteImg.addEventListener('click', () => {
      sessionStorage.setItem('entryId', data.id);
      deleteModal.style.display = 'block';
    });

    noButton.addEventListener('click', () => {
      deleteModal.style.display = 'none';
    });

    yesButton.addEventListener('click', () => {
      fetch(`https://morning-falls-51849.herokuapp.com/api/v1/entries/${sessionStorage.getItem('entryId')}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
        .then(resp => resp.json())
        .then((response) => {
          if (response.status === 200) {
            window.location.href = 'dashboard.html';
          } else {
            console.log(response);
            errorResponse.innerText = response.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // Function to display cards

  const displayAll = (data) => {
    data.reverse();
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      createCard(element);
    }
  };

  // Handling results for new users with empty databases
  const usingMyDiary = () => {
    section.innerHTML = `<p>Welcome to my Diary. Here's a little guide to help you know your way around.</p><br><br><br>
    <p>To add a new entry, just click on the big blue + button in the bottom corner.</p><br><br><br>
    <p>And if you'd like us to help remind you to pen something down, click on the icon in the upper right corner. Enjoy.</p>`;
  };

  // Fetch request to get entries if it exists
  fetch('https://morning-falls-51849.herokuapp.com/api/v1/entries', {
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
        sessionStorage.setItem('entriesTotal', data.data.length);
        const name = sessionStorage.getItem('firstName');
        const cappedName = name.charAt(0).toUpperCase() + name.slice(1, name.length);
        errorResponse.innerText = `Welcome to your Diary ${cappedName}`;
        if (data.data.length === 0) {
          usingMyDiary();
        } else {
          displayAll(data.data);
        }
      } else {
        window.location.href = 'index.html';
        errorResponse.innerText = data.message;
      }
    })
    .catch((err) => {
      console.log(err);
      window.location.href = 'index.html';
    });
});