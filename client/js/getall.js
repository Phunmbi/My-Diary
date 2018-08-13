window.addEventListener('load', () => {
  const errorResponse = document.getElementById('response');
  const section = document.getElementById('section');
  const loadingModal = document.getElementById('loadingModal');
  const deleteModal = document.getElementById('deleteModal');
  const noButton = document.getElementById('no-button');
  const yesButton = document.getElementById('yes-button');

  loadingModal.style.display = 'block';

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

  const displayAll = (data) => {
    data.reverse();
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      createCard(element);
    }
  };

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
        const name = sessionStorage.getItem('firstName');
        const cappedName = name.charAt(0).toUpperCase() + name.slice(1, name.length);
        errorResponse.innerText = `Welcome to your Diary ${cappedName}`;
        displayAll(data.data);
      } else {
        window.location.href = document.referrer;
        errorResponse.innerText = data.message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});