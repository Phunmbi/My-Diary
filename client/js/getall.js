window.addEventListener('load', () => {
  const response = document.getElementById('response');
  const section = document.getElementById('section');

  const createCard = (data) => {
    // Create elements that make up a card
    const card = document.createElement('div'),
      cardTitle = document.createElement('div'),
      cardDetails = document.createElement('div'),
      cardActions = document.createElement('div'),
      viewall = document.createElement('a'),
      edit = document.createElement('a'),
      deleteOne = document.createElement('a'),
      titleText = document.createElement('p'),
      date = document.createElement('p'),
      details = document.createElement('p'),
      editImg = document.createElement('img'),
      deleteImg = document.createElement('img');

    // Set their classes and attributes
    card.className = 'card';
    cardTitle.className = 'card-title';
    cardDetails.className = 'card-details';
    cardActions.className = 'card-actions';
    viewall.setAttribute('href', 'view.html');
    edit.setAttribute('href', 'edit.html');
    deleteOne.setAttribute('href', '#');
    titleText.setAttribute('id', 'cardTitleText');
    editImg.setAttribute('src', 'images/icons8-pencil-26.png');
    editImg.setAttribute('alt', 'edit');
    deleteImg.setAttribute('src', 'images/icons8-trash-26.png');
    deleteImg.setAttribute('alt', 'delete');

    // Set their values
    titleText.innerText = data.title;
    date.innertext = data.time_created;
    details.innerText = data.details;

    // Implement correct card structure
    viewall.appendChild(titleText);
    cardTitle.appendChild(viewall);
    cardTitle.appendChild(date);
    cardDetails.appendChild(details);
    edit.appendChild(editImg);
    deleteOne.appendChild(deleteImg);
    cardActions.appendChild(edit);
    cardActions.appendChild(deleteOne);
    card.appendChild(cardTitle);
    card.appendChild(cardTitle);
    card.appendChild(cardActions);
    section.appendChild(card);
  };

  const displayAll = (data) => {
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
    .then((data) => {
      if (data.status === 204) {
        console.log(data);
        const name = sessionStorage.getItem('firstName');
        const cappedName = name.charAt(0).toUpperCase() + name.slice(1, name.length);
        response.innerText = `Welcome to your Diary ${cappedName}`;
      } else if (data.status === 200) {
        const name = sessionStorage.getItem('firstName');
        const cappedName = name.charAt(0).toUpperCase() + name.slice(1, name.length);
        response.innerText = `Welcome to your Diary ${cappedName}`;
        console.log(data);
        displayAll(data.body);
      } else {
        window.location.href = document.referrer;
        response.innerText = data.message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});