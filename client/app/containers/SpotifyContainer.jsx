import React, {Component} from 'react'
import SpotifyObject from '../components/SpotifyObject'
import UserTrack from '../components/UserTrack'
class SpotifyContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      query: '',
      results: [],
      tracks: [],
      justSearched: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearchQuery = this.handleSearchQuery.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  componentWillMount(){
    this.setState({tracks: this.props.tracks})
  }
  handleSearchQuery(event){
    this.setState({query: event.target.value})
  }

  handleAdd(uri){
    let userId = this.props.user.id
    let payload = {
      spotify_uri: uri
    }
    fetch(`/api/v1/users/${userId}/user_tracks`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
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
      this.setState({
        tracks: response,
        query: '',
        justSearched: false
        })
    })
  }

  handleDelete(id){
    let userId = this.props.user.id
    if(confirm("Are you sure you want to delete this?") == true){
    fetch(`/api/v1/users/${userId}/user_tracks/${id}`, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
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
      this.setState({
        tracks: response,
        query: '',
        justSearched: false});
    })
    }
  }

  clearSearch(event){
    event.preventDefault()
    this.setState({
      results: [],
      query: '',
      justSearched: false
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let str = this.state.query
    let query = str.replace(/\s/g, "%20");
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
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
      this.setState({
        results: response.tracks.items,
        justSearched: true})
    })
  }
  render(){
    let results;
    if(this.state.justSearched === true){
      if(this.state.results.length > 1){
        results = this.state.results.map(result => {
          return(
            <SpotifyObject
              key={result.id}
              img={result.album.images[2].url}
              preview={result.preview_url}
              name={result.name}
              artist={result.artists[0].name}
              album={result.album.name}
              onSubmit={this.handleAdd.bind(this, result.uri)}/>
          )}
          )
        }else {
          results = <h4 className="no-results">Your search didn't yield any results</h4>
        }
      }else{ results = null }


    let tracks = this.state.tracks.map(track => {
      return(
        <UserTrack
        key={track.id}
        uri={track.spotify_uri}
        onDelete={this.handleDelete.bind(this, track.id)}
        validUser={this.props.validUser}/>
      )
    })
    let spotifySearch;
    if (this.props.validUser) {
      spotifySearch = <form className="spotify-search-form">
                        <label>Add Your Tracks from Spotify:</label>
                        <input type="query" value={this.state.query} onChange={this.handleSearchQuery}/>
                        <input type="submit" onClick={this.handleSubmit} value="Search"/> | <input type="submit" onClick={this.clearSearch} value="Clear" />
                      </form>

    }


    return(
      <div className="row">
        <div className="spotify-container">
        <fieldset>
          <legend>{this.props.user.first_name}'s Tracks</legend>
          <div className="row small-up-1 medium-up-2 large-up-4 spotify-tracks">
          {tracks}
            </div>
            {spotifySearch}
            <p className="disclaimer">
            Note: You must be signed into your Spotify account to preview these tracks. Create an account <a href='https://www.spotify.com/us/'>here</a>
          </p>
        <div className="row small-up-1 medium-up-2 large-up-2">
          {results}
        </div>
        </fieldset>
      </div>
    </div>
    )
  }
}

export default SpotifyContainer
