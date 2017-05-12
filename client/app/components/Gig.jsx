import React, { Component } from 'react'
import Select from 'react-select'
import Genre from './Genre'
import Datetime from 'react-datetime'
import moment from 'moment'
class Gig extends Component {
  constructor(props){
    super(props)
    this.state = {
      editable: false,
      venue: this.props.venue,
      address: this.props.address,
      dateTime: this.props.dateTime,
      description: this.props.description,
      genres: []
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleVenueChange = this.handleVenueChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleGenre = this.handleGenre.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
  }

  componentWillMount(){
    let genreDefaults = this.props.genres.map(genre => {
      return(
        {value: genre, label: genre}
      )
    })
    this.setState({genres: genreDefaults})
    let date = new Date(this.props.dateTime)
    let goodDate = moment(date).add(4, 'hours').format('llll');
    this.setState({dateTime: goodDate})
  }

  handleVenueChange(event){
    this.setState({venue: event.target.value})
  }

  handleAddressChange(event){
    this.setState({address: event.target.value})
  }

  handleDateTimeChange(event){
    let date = new Date(event._d)
    let goodDate = moment(date).format('llll');
    this.setState({dateTime: goodDate})
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value})
  }

  parseSelect(arr){
    let returnValue = []
    arr.forEach((obj) => {
      returnValue.push(obj.value)
    })
    return returnValue
  }

  handleGenre(val){
    this.setState({genres: val})
  }

  handleEdit() {
    console.log('edit button clicked');
    let venue = this.state.venue;
    let address = this.state.address;
    let dateTime = this.state.dateTime
    let description = this.state.description;
    let genres = this.parseSelect(this.state.genres)
    let gig = {
      id: this.props.id,
      venue: venue,
      address: address,
      description: description,
      dateTime: dateTime,
      genres: genres
    };
    this.props.handleUpdate(gig);
    this.setState({editable: !this.state.editable});
  }

  render(){
    let genres = this.props.genres.map(genre => {
      return(
        <Genre
          key={genre.id}
        genreName={genre}
        />
      )
    })

    let options = this.props.allGenres.map(genre => {
      return(
        {value: genre, label: genre}
      )
    })
    let editGigButton;
    if (this.props.validUser) {
      editGigButton = <div>
                        <td><button onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button></td>
                        <td><button onClick={this.props.handleDelete}>Delete</button></td>
                      </div>
    }
    let venue = this.state.editable ? <td><input type='text' defaultValue={this.props.venue} onChange={this.handleVenueChange} /></td> : <td>{this.props.venue}</td>;
    let address = this.state.editable ? <td><input type='text' defaultValue={this.props.address} onChange={this.handleAddressChange}/></td> : <td>{this.props.address}</td>;
    let dateTime = this.state.editable ? <td><Datetime onChange={this.handleDateTimeChange} defaultValue={this.state.dateTime} closeOnSelect={true}/></td> : <td>{this.state.dateTime}</td>;
    let description = this.state.editable ? <td><input type='text' defaultValue={this.props.description} onChange={this.handleDescriptionChange} /></td>: <td>{this.props.description}</td>;
    let genreDisplay = this.state.editable ? <td width="100%"><Select name="Genres" multi={true} value={this.state.genres} options={options} onChange={this.handleGenre}/></td> : <td className="genre-column">{genres}</td>
    return(
      <tr>
        {venue}
        {address}
        {dateTime}
        {description}
        {genreDisplay}
        {editGigButton}
      </tr>
    )
  }
}

export default Gig
