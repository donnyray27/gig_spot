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
      genres: [],
      errors: {}
    }
    this.handleVenue = this.handleVenue.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handleDateTime = this.handleDateTime.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.handleGenre = this.handleGenre.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
    this.validateVenue = this.validateVenue.bind(this)
    this.validateAddress = this.validateAddress.bind(this)
    this.validateDate = this.validateDate.bind(this)
  }

  clearForm(){
    this.setState({
      venue: '',
      address: '',
      date: '',
      description: '',
      genres: [],
      errors: {}
    })
  }
  validateVenue(input){
    let regex = /^\s|^\s+/g
    if(input.match(regex)){
      let newError = {venue: 'Venue is a required field'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.venue
      this.setState({ errors: errorState })
      return true
    }
  }
  handleVenue(event){
    this.validateVenue(event.target.value)
    this.setState({venue: event.target.value})
  }

  validateAddress(input){
    let regex = /^\s|^\s+/g
    if(input.match(regex)){
      let newError = {address: 'Address is a required field'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.address
      this.setState({ errors: errorState })
      return true
    }
  }

  handleAddress(event){
    this.validateAddress(event.target.value)
    this.setState({address: event.target.value})
  }

  validateDate(input){
    if(input === "Invalid date"){
      let newError = {date: 'Please select a valid date and time'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.date
      this.setState({ errors: errorState })
      return true
    }
  }


  handleDateTime(event){
    let date = new Date(event._d)
    let goodDate = moment(date).format('dddd MMMM Do YYYY, h:mm a')
    this.validateDate(goodDate)
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
    if (
      this.validateVenue(venue) &&
      this.validateAddress(address) &&
      this.validateDate(dateTime)
    ) {
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
  }

  render(){
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert no-bullet">{errorItems}</div>
    }

      let options = this.props.allGenres.map(genre => {
        return(
          {value: genre, label: genre}
        )
      })
    return(
      <div>
        {errorDiv}
      <table>
        <thead>
          <tr>
            <th>Venue</th>
            <th>Address</th>
            <th>Date & Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type='text' onChange={this.handleVenue} value={this.state.venue} placeholder="Required"/></td>
            <td><input type='text' onChange={this.handleAddress} value={this.state.address} placeholder="Required "/></td>
            <td className="gig-date"><Datetime onChange={this.handleDateTime} defaultValue='' placeholder="Required"/></td>
            <td><input type='text' onChange={this.handleDescription} value={this.state.description}/></td>
            <td><button onClick={this.handleClick}>Submit</button></td>
          </tr>

      </tbody>
      <tfoot>
      <tr>
      <td width="100%" colSpan="4"><Select name="Genres" placeholder="Select Genres" multi={true} value={this.state.genres} options={options} onChange={this.handleGenre}/></td>
      </tr>
    </tfoot>
    </table>
    </div>
    )
  }
}

export default GigNew
