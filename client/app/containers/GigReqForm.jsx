import React , { Component } from 'react'
import Datetime from 'react-datetime'
import Select from 'react-select'
import TextField from '../components/TextField'
class GigReqForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      genreTags: [],
      instrumentTags: [],
      title: '',
      description: '',
      date: '',
      location: ''
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
  }

  handleTitle(event){
    this.setState({title: event.target.value})
  }

  handleLocation(event){
    this.setState({location: event.target.value})
  }

  handleDescription(event){
    this.setState({description: event.target.value})
  }

  handleDate(event){
    this.setState({date: event._d})
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
      location: ''
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
  render(){

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
          onChange={this.handleDate}
          timeFormat={false}
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
