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
      editingInstrument: false
    }
    this.handleGigUpdate = this.handleGigUpdate.bind(this)
    this.handleNewGig = this.handleNewGig.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleGigDelete = this.handleGigDelete.bind(this)
    this.handleGenreUpdate = this.handleGenreUpdate.bind(this)
    this.handleEditGenre = this.handleEditGenre.bind(this)
    this.handleEditInstrument = this.handleEditInstrument.bind(this)
    this.handleInstrumentUpdate = this.handleInstrumentUpdate.bind(this)
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


  render() {

  let addGig = this.state.addingAGig ? <div><GigNew onClick={this.handleNewGig} allGenres={this.props.genresAll}/>
                                        <button onClick={this.handleCreate}>Cancel</button></div> :
                                        <button onClick={this.handleCreate}>Add a Gig</button>

  let editGenre = this.state.editingGenre ?
                        <GenreUpdateContainer
                                allGenres={this.props.genresAll}
                                userGenres={this.state.genres}
                                onUpdate={this.handleGenreUpdate}
                                /> : <div>
                                      <GenresContainer
                                        genres={this.state.genres}/>
                                      <button onClick={this.handleEditGenre}>Edit</button>
                                    </div>



  let editInstrument = this.state.editingInstrument ?
                                    <div><InstrumentUpdateContainer
                                            allInstruments={this.props.instrumentsAll}
                                            userInstruments={this.state.instruments}
                                            onUpdate={this.handleInstrumentUpdate}
                                            />
                                        </div> : <div>
                                                  <InstrumentsContainer instruments={this.state.instruments}/>
                                                  <button onClick={this.handleEditInstrument}>Edit</button>
                                                </div>
    return(
      <div className ="row">
        <div className="profile-details">
        <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>

        <fieldset>
          <legend>Bio</legend>
          <h5>{this.state.user.bio}</h5>
        </fieldset>

    <fieldset>
        <legend>Instruments</legend>
        {editInstrument}
      </fieldset>

      <fieldset>
        <legend>Genre(s)</legend>
        {editGenre}
      </fieldset>
                        <br />
                        <br />
                        <br />
                        <br />

        <fieldset>
          <legend>{this.state.user.first_name}'s Gigs</legend>
      <GigsContainer gigs={this.state.gigs}
          onUpdate={this.handleGigUpdate}
          handleGigDelete={this.handleGigDelete}
          genres={this.props.genresAll}
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

    )
  }
}

export default UserData
