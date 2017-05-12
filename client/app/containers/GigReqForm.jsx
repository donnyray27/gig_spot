import React , { Component } from 'react'
import Datetime from 'react-datetime'
import Select from 'react-select'
import TextField from '../components/TextField'
import moment from 'moment'
class GigReqForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      genreTags: [],
      instrumentTags: [],
      title: '',
      description: '',
      date: '',
      location: '',
      errors: {}
    }
    this.handlelogChange = this.handlelogChange.bind(this)
    this.handleInstChange = this.handleInstChange.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.validateDate = this.validateDate.bind(this)
    this.validateLocation = this.validateLocation.bind(this)
    this.validateDescription = this.validateDescription.bind(this)
  }

  validateTitle(input){
    let regex = /^\s|^\s+/g
    if(input.match(regex)){
      let newError = {heading: 'Heading is a required field'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.heading
      this.setState({ errors: errorState })
      return true
    }
  }

  handleTitle(event){
    this.validateTitle(event.target.value)
    this.setState({title: event.target.value})
  }

  validateLocation(input){
    let regex = /^\s|^\s+/g
    let regexTwo = /^[A-Za-z]+,[ ]?[A-Za-z]{2,}$/g
    if(input.match(regex)){
      let newError = {location: 'Location is a required field'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else if (!input.match(regexTwo)) {
      let newError = {location: "Please enter in the form 'City, State'"}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    }else {
      let errorState = this.state.errors
      delete errorState.location
      this.setState({ errors: errorState })
      return true
    }
  }

  handleLocation(event){
    this.validateLocation(event.target.value)
    this.setState({location: event.target.value})
  }

  validateDescription(input){
    let regex = /^\s|^\s+/g
    if(input.match(regex)){
      let newError = {description: 'Description is a required field'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.description
      this.setState({ errors: errorState })
      return true
    }
  }

  handleDescription(event){
    this.validateDescription(event.target.value)
    this.setState({description: event.target.value})
  }

  validateDate(input){
    if(input === "Invalid date" || input === ''){
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

  handleDate(event){
    let date = new Date(event._d)
    let goodDate = moment(date).format('ll')
    this.validateDate(goodDate)
    this.setState({date: goodDate})
  }

  handlelogChange(val){
    this.setState({genreTags: val})
  }

  handleInstChange(val){
    this.setState({instrumentTags: val})
  }

  clearForm(event){
    event.preventDefault()
    this.setState({
      title: '',
      date: '',
      genreTags: [],
      instrumentTags: [],
      description: '',
      location: '',
      errors: {}
    })
  }

  parseSelect(arr){
    let returnValue = []
    arr.forEach((obj) => {
      returnValue.push(obj.value)
    })
    return returnValue
  }


  handleSubmit(event){
    event.preventDefault()
    let genres = this.parseSelect(this.state.genreTags)
    let instruments = this.parseSelect(this.state.instrumentTags)
    if (
      this.validateTitle(this.state.title) &&
      this.validateDate(this.state.date) &&
      this.validateDescription(this.state.description)
    ) {
      let gigReq = {
        title: this.state.title,
        event_date: this.state.date,
        genres: genres,
        instruments: instruments,
        description: this.state.description,
        location: this.state.location
      }
      this.props.onSubmit(gigReq)
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


    let yesterday = Datetime.moment().subtract( 1, 'day' );
    let valid = function( current ){
        return current.isAfter( yesterday );
    };

    let genres = this.props.allGenres.map(genre => {
      return(
        {value: genre, label: genre}
      )
    })
    let instruments = this.props.allInstruments.map(instrument => {
      return(
        {value: instrument, label: instrument}
      )
    })
    return(
      <div className="row gig-req-form">
        {errorDiv}
      <form className="column small-12 med-8 lg-6 small-centered">
        <TextField
          label='Heading'
          content={this.state.title}
          name='title'
          handlerFunction={this.handleTitle}
          placeholder="Required"
          />
        <br />
        <br/>
        <label>
          Gig Date:
          <div className="date-field">
        <Datetime
          value={this.state.date}
          onChange={this.handleDate}
          timeFormat={false}
          closeOnSelect={true}
          isValidDate={valid}
          />
      </div>
      </label>
      <br/>
      <br/>
      <TextField
        label='City/State'
        content={this.state.location}
        name='location'
        handlerFunction={this.handleLocation}
        placeholder="Required: e.g. Boston, MA"
        />
      <br/>
      <br/>
      <label>
        Genre(s):
      <Select
        name="Genres"
        multi={true}
        value={this.state.genreTags}
        options={genres}
        onChange={this.handlelogChange}
        />
    </label>
    <br/>
      <label>Instrument(s):
        <Select
          name="Instruments"
          multi={true}
          value={this.state.instrumentTags}
          options={instruments}
          onChange={this.handleInstChange}
          />
      </label>
      <br/>
          <label>Description</label><br/>
          <textarea placeholder="Required: Provide a short description of what your're looking for and consider providing an audition piece!"
            rows="3"
            cols="70"
            value={this.state.description}
            onChange={this.handleDescription}>
          </textarea>
          <br />
          <div className="gig-req-buttons">
          <button className="gig-req-submit" onClick={this.handleSubmit}>Submit</button>
          <br />
          <button className="clear-cancel" onClick={this.clearForm}>Clear</button> | <button className="clear-cancel" onClick={this.props.onCancel}>Cancel</button>
          </div>
      </form>
      </div>
    )
  }
}

export default GigReqForm
