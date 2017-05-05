import React, { Component } from 'react'
import GigNew from '../components/GigNew'
import InstrumentsContainer from './InstrumentsContainer'
import GenresContainer from './GenresContainer'
import GigsContainer from './GigsContainer'
import GigRequestsContainer from './GigRequestsContainer'
import BandRequestsContainer from './BandRequestsContainer'
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
      bandRequests: this.props.bandRequests,
      addingAGig: false,
      editingGenre: false,
      editingInstrument: false
    }
    this.handleGigUpdate = this.handleGigUpdate.bind(this)
    this.handleNewGig = this.handleNewGig.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete(id) {
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
          this.setState({ gigs: response});
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
        this.setState({ genres: response});
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
        this.setState({ instruments: response});
      })
    }


  render() {

    let addGig = this.state.addingAGig ? <div><GigNew onClick={this.handleNewGig}/>
                                        <button onClick={this.handleCreate}>Cancel</button></div> :
                                        <button onClick={this.handleCreate}>Add a Gig</button>

  let editGenre = this.state.editingGenre ?
                        <div><GenreUpdateContainer
                                allGenres={this.props.genresAll}
                                userGenres={this.state.genres}
                                onUpdate={this.handleGenreUpdate}
                                />
                              <button onClick={this.handleEditGenre}>Done</button>
                        </div> :
                      <button onClick={this.handleEditGenre}>Edit</button>

  let editInstrument = this.state.editingInstrument ?
                                    <div><InstrumentUpdateContainer
                                            allInstruments={this.props.instrumentsAll}
                                            userInstruments={this.state.instruments}
                                            onUpdate={this.handleInstrumentUpdate}
                                            />
                                          <button onClick={this.handleEditInstrument}>Done</button>
                                    </div> :
                                  <button onClick={this.handleEditInstrument}>Edit</button>

    return(
      <div className ="row">
        <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>

        <fieldset>
          <legend>Bio</legend>
          <h5>{this.state.user.bio}</h5>
        </fieldset>

    <fieldset>
        <legend>Instruments</legend>
        <InstrumentsContainer instruments={this.state.instruments}/>
        {editInstrument}
      </fieldset>

      <fieldset>
        <legend>Genres</legend>
        <GenresContainer
          genres={this.state.genres}
          />
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
          handleDelete={this.handleDelete}
          />
          {addGig}
        </fieldset>
          <br />
          <br />
          <fieldset>
            <legend>{this.state.user.first_name}'s Requests</legend>
            <h6>Gig Requests</h6>
        <GigRequestsContainer
          gigRequests={this.state.gigRequests}
          />
        <br />
        <br />
        <h6>Band Requests</h6>
        <BandRequestsContainer bandRequests={this.state.bandRequests}/>
        </fieldset>
      </div>

    )
  }
}

export default UserData
