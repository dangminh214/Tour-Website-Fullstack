//import destinationModel from './models/destinationModel'
async function submitNewTourForm() {
  const nameInput = document.querySelector('.inputNewTourName');
  const name = nameInput ? nameInput.value : '';
  console.log(nameInput);

  const descriptionInput = document.querySelector('.inputNewTourDescription');
  const description = descriptionInput ? descriptionInput.value : '';

  const destinationInput = document.querySelector('.inputNewTourDestination');
  const destinationName = destinationInput ? destinationInput.value : '';

  console.log("new Tour: ", name, description, destinationName)

  const tourData = { name, description, destination: destinationName}
  const createTourResponse = fetch('/tours/newTour', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tourData),
  })
  .then(response => {
    if (response.ok) {
      console.log('Tour created successfully');
      // Optionally, redirect the user to another page after creating the tour
      window.location.href = '/tours';
    } else {
      console.error('Failed to create tour');
    }
  })
  .catch(error => console.error('Error submitting form:', error));
}

async function submitNewDestinationForm() {
  const nameInput = document.querySelector('.inputNewDestinationName');
  const name = nameInput ? nameInput.value : '';
  console.log(nameInput);

  const descriptionInput = document.querySelector('.inputDestinationDescription');
  const description = descriptionInput ? descriptionInput.value : '';

  console.log("new Destination: ", name, description)

  const destionationData = { name, description}
  const createDestinationResponse = fetch('/destination/newDestination', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(destionationData),
  })
  .then(response => {
    if (response.ok) {
      console.log('Destination created successfully');
      window.location.href = '/destination';
    } else {
      console.error('Failed to create new Destination');
    }
  })
  .catch(error => console.error('Error submitting form:', error));
}