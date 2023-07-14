window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
    const loadingIcon = document.getElementById('loading-conference-spinner');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

      loadingIcon.classList.add("d-none")
      selectTag.classList.remove("d-none")


    }
    //Get the attendee form element by its id
    const formTag = document.getElementById('create-attendee-form');
    //Add an event handler for the submit event
    formTag.addEventListener('submit', async event => {
        //Prevent the default from happening
      event.preventDefault();
      //Create a FormData object from the form
      const formData = new FormData(formTag);
      //Get a new object from the form data's entries
      const json = JSON.stringify(Object.fromEntries(formData));

      const attendeeUrl = 'http://localhost:8001/api/attendees/';
      //Create options for the fetch
      //Make the fetch using the await keyword to the URL
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(attendeeUrl, fetchConfig);
      const messageTag = document.getElementById('success-message')

      if (response.ok) {
        formTag.classList.add("d-none")
        messageTag.classList.remove("d-none")
        formTag.reset();
        const newAttendee = await response.json();
        console.log(newAttendee);
      }

    });

  });
