import React, { useEffect, useState } from 'react';

function ConferenceForm(){

    const [locations, setLocations] = useState([]);

    const fetchData = async () => {
      const url = 'http://localhost:8000/api/locations/';

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setLocations(data.locations)
      }
    }

    const [name, setName] = useState('');
    const handleNameChange = (event) =>{
        const value = event.target.value;
        setName(value);
    }

    const [starts, setStarts] = useState('');

    const handleStartsChange = (event) => {
    const value = event.target.value;
    setStarts(value);
    }

    const [ends, setEnds] = useState('');

    const handleEndsChange = (event) => {
    const value = event.target.value;
    setEnds(value);
    }

    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
    }

    const [max_presentations, setMaxPresentations] = useState('');

    const handleMaxPresentationChange = (event) => {
    const value = event.target.value;
    setMaxPresentations(value);
    }

    const [max_attendees, setMaxAttendees] = useState('');

    const handleMaxAttendeesChange = (event) => {
    const value = event.target.value;
    setMaxAttendees(value);
    }

    const [location, setLocation] = useState('');

    const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = max_presentations;
        data.max_attendees = max_attendees;
        data.location = location;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }
      }




    useEffect(() => {
      fetchData();
    }, []);


    return(
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new conference</h1>
                <form onSubmit={handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name"
                    className="form-control" value={name} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleStartsChange} placeholder="Starts" required type="date" name="starts" id="starts"
                    className="form-control" value={starts}/>
                    <label htmlFor="starts">Starts</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleEndsChange} placeholder="Ends" required type="date" name="ends" id="ends"
                    className="form-control" value={ends}/>
                    <label htmlFor="ends">Ends</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea onChange={handleDescriptionChange} className="form-control" name="description" id="description" rows="3" value={description}/>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleMaxPresentationChange} placeholder="Max Presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" value={max_presentations}/>
                    <label htmlFor="max_presentations">Maximum presentations</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleMaxAttendeesChange} placeholder="Max Attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" value={max_attendees}/>
                    <label htmlFor="max_attendees">Maximum attendees</label>
                </div>
                <div className="mb-3">
              <select onChange={handleLocationChange} required name="location" id="location" className="form-select" value ={location}>
                <option value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                        );
                    })}
                </select>
              </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default ConferenceForm
