import React, { Component } from 'react'
import Select from 'react-select'
import Datetime from 'react-datetime'
import moment from 'moment'
class GigNew extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: '',
      address: '',
      date: '',
      description: '',
      genres: []
    }
    this.handleVenue = this.handleVenue.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handleDateTime = this.handleDateTime.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.handleGenre = this.handleGenre.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
  }

  clearForm(){
    this.setState({
      venue: '',
      address: '',
      date: '',
      description: '',
      genres: []
    })
  }
  handleVenue(event){
    this.setState({venue: event.target.value})
  }

  handleAddress(event){
    this.setState({address: event.target.value})
  }

  handleDateTime(event){
    let date = new Date(event._d)
    let goodDate = moment(date).format('dddd MMMM Do YYYY, h:mm a')
    this.setState({date: goodDate})
  }

  handleDescription(event){
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

  handleClick(event){
    event.preventDefault()
    let venue = this.state.venue
    let address = this.state.address
    let dateTime = this.state.date
    let description = this.state.description
    let genres = this.parseSelect(this.state.genres)
    let newGig = {
      venue: venue,
      address: address,
      description: description,
      dateTime: dateTime,
      genres: genres
    }
    this.props.onClick(newGig)
    this.clearForm()
  }

  render(){

      let options = this.props.allGenres.map(genre => {
        return(
          {value: genre, label: genre}
        )
      })
    return(
      <table>
        <thead>
          <tr>
            <th>Venue</th>
            <th>Address</th>
            <th>Date & Time</th>
            <th>Description</th>
            <th>Genre(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type='text' onChange={this.handleVenue} value={this.state.venue}/></td>
            <td><input type='text' onChange={this.handleAddress} value={this.state.address}/></td>
            <td><Datetime onChange={this.handleDateTime} defaultValue=''/></td>
            <td><input type='text' onChange={this.handleDescription} value={this.state.description}/></td>
            <td width="100%"><Select name="Genres" multi={true} value={this.state.genres} options={options} onChange={this.handleGenre}/></td>
            <td><button onClick={this.handleClick}>Submit</button></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default GigNew
