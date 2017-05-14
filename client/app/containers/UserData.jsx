import React, { Component } from 'react'
import GigNew from '../components/GigNew'
import InstrumentsContainer from './InstrumentsContainer'
import GenresContainer from './GenresContainer'
import GigsContainer from './GigsContainer'
import GigRequestsContainer from './GigRequestsContainer'
import GenreUpdateContainer from './GenreUpdateContainer'
import InstrumentUpdateContainer from './InstrumentUpdateContainer'

class UserData extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.user,
      instruments: this.props.instruments,
      genres: this.props.genres,
      gigs: this.props.gigs,
      gigRequests: this.props.gigRequests,
      addingAGig: false,
      editingGenre: false,
      editingInstrument: false,
      bio: this.props.user.bio,
      editingBio: false
    }
    this.handleGigUpdate = this.handleGigUpdate.bind(this)
    this.handleNewGig = this.handleNewGig.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleGigDelete = this.handleGigDelete.bind(this)
    this.handleGenreUpdate = this.handleGenreUpdate.bind(this)
    this.handleEditGenre = this.handleEditGenre.bind(this)
    this.handleEditInstrument = this.handleEditInstrument.bind(this)
    this.handleInstrumentUpdate = this.handleInstrumentUpdate.bind(this)
    this.handleBioUpdate = this.handleBioUpdate.bind(this)
    this.handleEditBio = this.handleEditBio.bind(this)
    this.handleBioChange = this.handleBioChange.bind(this)
  }

  handleEditInstrument(){
    this.setState({editingInstrument: !this.state.editingInstrument})
  }
  handleEditGenre(){
    this.setState({editingGenre: !this.state.editingGenre})
  }

  handleCreate(){
    this.setState({
      addingAGig: !this.state.addingAGig
    })
  }

  handleEditBio(){
    this.setState({editingBio: !this.state.editingBio})
  }

  handleBioChange(event){
    this.setState({bio: event.target.value})
  }

  handleGigDelete(id) {
    let userId = this.props.user.id
   if(confirm("Are you sure you want to delete this?") == true){
    fetch(`/api/v1/users/${userId}/gigs/${id}`, {
    credentials: 'same-origin',
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      this.setState({ gigs: response});
    })
    }
  }

  handleGigUpdate(gig) {
      let userId = this.props.user.id
      fetch(`/api/v1/users/${userId}/gigs/${gig.id}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gig)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({ gigs: response});
      })
  }

  handleNewGig(gig) {
      let userId = this.props.user.id

        fetch(`/api/v1/users/${userId}/gigs`, {
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gig)
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          this.setState({
            gigs: response,
            addingAGig: !this.state.addingAGig
          });
        })
    }

    handleGenreUpdate(genre){
      let userId = this.props.user.id
      let update = {
        genreUpdate: genre
      }
      fetch(`/api/v1/users/${userId}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          genres: response,
          editingGenre: !this.state.editingGenre});
      })
    }

    handleInstrumentUpdate(instrument){
      let userId = this.props.user.id
      let update = {
        instrumentUpdate: instrument
      }
      fetch(`/api/v1/users/${userId}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          instruments: response,
          editingInstrument: !this.state.editingInstrument
        });
      })
    }

    handleBioUpdate(){
      let userId = this.props.user.id
      let update = {
        bioUpdate: this.state.bio
      }
      fetch(`/api/v1/users/${userId}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          bio: response.bio,
          editingBio: !this.state.editingBio
        });
      })
    }


  render() {

  let addGigButton;
    if(this.props.validUser && !this.state.addingAGig){
      addGigButton = <button className="candy-button" onClick={this.handleCreate}>Add a Gig</button>
    }

  let addGig = this.state.addingAGig ? <div><GigNew onClick={this.handleNewGig} allGenres={this.props.genresAll}/>
                                          <button className="candy-button" onClick={this.handleCreate}>Cancel</button>
                                        </div> : addGigButton

  let editBioButton;
    if(this.props.validUser && !this.state.editingBio){
      editBioButton = <button className="candy-button" onClick={this.handleEditBio}>Edit</button>
    }
  let editBio = this.state.editingBio ? <div><h5><textarea className="bio-edit-field" type="text" value={this.state.bio} onChange={this.handleBioChange}></textarea></h5>
                                      <button className="candy-button" onClick={this.handleBioUpdate}>Done</button></div> : <h5>{this.state.bio}</h5>

  let editGenreButton;
  if(this.props.validUser && !this.state.editingGenre){
    editGenreButton = <button className="candy-button" onClick={this.handleEditGenre}>Edit</button>
  }
  let editGenre = this.state.editingGenre ?
                        <GenreUpdateContainer
                                allGenres={this.props.genresAll}
                                userGenres={this.state.genres}
                                onEdit = {this.handleEditGenre}
                                onUpdate={this.handleGenreUpdate}
                                /> : <div>
                                      <GenresContainer
                                        genres={this.state.genres}/>
                                    </div>

  let instrumentEditButton;
    if(this.props.validUser && !this.state.editingInstrument){
      instrumentEditButton = <button className="candy-button" onClick={this.handleEditInstrument}>Edit</button>
    }

  let editInstrument =  this.state.editingInstrument ?
                                    <div><InstrumentUpdateContainer
                                            allInstruments={this.props.instrumentsAll}
                                            userInstruments={this.state.instruments}
                                            onUpdate={this.handleInstrumentUpdate}
                                            />
                                        </div> : <InstrumentsContainer instruments={this.state.instruments}/>



    return(
      <div className ="row">
        <div className="profile-details">
        <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>

        <fieldset>
          <legend>Bio</legend>
          {editBio}
          {editBioButton}
        </fieldset>

      <div className="row inst-genre">
        <div className="column small-12 large-6 tag-field-instrument">
    <fieldset>
        <legend>Instrument(s)</legend>
        {editInstrument}
        {instrumentEditButton}
      </fieldset>
    </div>
    <div className="column small-12 large-6 tag-field">
      <fieldset>
        <legend>Genre(s)</legend>
        {editGenre}
        {editGenreButton}
      </fieldset>
    </div>
    </div>
                        <br />
                        <br />

      <div className="gigs">
        <fieldset>
          <legend>{this.state.user.first_name}'s Gigs</legend>
          <GigsContainer gigs={this.state.gigs}
            onUpdate={this.handleGigUpdate}
            handleGigDelete={this.handleGigDelete}
            genres={this.props.genresAll}
            validUser={this.props.validUser}
          />
          {addGig}
        </fieldset>

          <br />
          <br />
          <fieldset>
            <legend>{this.state.user.first_name}'s Gig Requests</legend>
        <GigRequestsContainer
          gigRequests={this.state.gigRequests}
          />
        </fieldset>
        </div>
        </div>
      </div>

    )
  }
}

export default UserData
