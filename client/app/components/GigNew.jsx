import React, { Component } from 'react'

class GigNew extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: '',
      address: '',
      date: '',
      description: ''
    }
    this.handleVenue = this.handleVenue.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handleDateTime = this.handleDateTime.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  clearForm(){
    this.setState({
      venue: '',
      address: '',
      date: '',
      description: ''
    })
  }
  handleVenue(event){
    this.setState({venue: event.target.value})
  }

  handleAddress(event){
    this.setState({address: event.target.value})
  }

  handleDateTime(event){
    this.setState({date: event.target.value})
  }

  handleDescription(event){
    this.setState({description: event.target.value})
  }

  handleClick(event){
    event.preventDefault()
    let venue = this.state.venue
    let address = this.state.address
    let dateTime = this.state.date
    let description = this.state.description
    let newGig = {
      venue: venue,
      address: address,
      description: description,
      dateTime: dateTime
    }
    this.props.onClick(newGig)
    this.clearForm()
  }

  render(){
    return(
      <table>
        <thead>
          <tr>
            <th>Venue</th>
            <th>Address</th>
            <th>Date/Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type='text' onChange={this.handleVenue} value={this.state.venue}/></td>
            <td><input type='text' onChange={this.handleAddress} value={this.state.address}/></td>
            <td><input type='text' onChange={this.handleDateTime} value={this.state.date}/></td>
            <td><input type='text' onChange={this.handleDescription} value={this.state.description}/></td>
            <td><button onClick={this.handleClick}>Submit</button></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default GigNew
