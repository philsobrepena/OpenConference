import React, {useEffect, useState } from 'react';

function PresentationForm(){

    const [conferences, setConferences] = useState([]);
    const [conference, setConference] = useState('');
    const [presenter_name, setPresenterName] = useState('');
    const [presenter_email, setPresenterEmail] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [hasSignedUp, setHasSignedUp] = useState(false);


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setConferences(data.conferences);
        }
    }

    useEffect(() => {
    fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.conference = conference;
        data.presenter_name = presenter_name;
        data.presenter_email = presenter_email;
        data.company_name = company_name;
        data.title = title;
        data.synopsis = synopsis;

        const selectTag = document.getElementById('conference');
        const conferenceId = selectTag.options[selectTag.selectedIndex].value;
        const presentationUrl = `http://localhost:8000${conferenceId}presentations/`;

        const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const attendeeResponse = await fetch(presentationUrl, fetchOptions);
        if (attendeeResponse.ok) {
            setConferences([]);
            setConference('');
            setPresenterName('');
            setPresenterEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');
            setHasSignedUp(true);
        }
    }

    const handleChangeConference = (event) => {
        const value = event.target.value;
        setConference(value);
    }

    const handleChangePresenterName = (event) => {
        const value = event.target.value;
        setPresenterName(value);
    }

    const handleChangePresenterEmail = (event) => {
        const value = event.target.value;
        setPresenterEmail(value);
    }
    const handleChangeCompanyName = (event) => {
        const value = event.target.value;
        setCompanyName(value);
    }
    const handleChangeTitle = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
    const handleChangeSynopsis = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }


    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';

    if (hasSignedUp) {
        messageClasses = 'alert alert-success mb-0';
        formClasses = 'd-none';
    }



    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form className={formClasses} onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={handleChangePresenterName} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChangePresenterEmail} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChangeCompanyName} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"/>
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleChangeTitle} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={handleChangeSynopsis} placeholder="Synopsis" id="synopsis" rows="3" name="synopsis" className="form-control"></textarea>
              </div>
              <div className="mb-3">
              <select onChange={handleChangeConference} name="conference" id="conference" className="form-select" required>
                    <option value="">Choose a conference</option>
                    {conferences.map(conference => {
                      return (
                        <option key={conference.href} value={conference.href}>{conference.name}</option>
                      )
                    })}
                  </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Congratulations! You're all signed up!
            </div>
          </div>
        </div>
      </div>
    )
}

export default PresentationForm
