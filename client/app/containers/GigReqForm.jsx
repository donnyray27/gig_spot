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
      date: ''
    }
    this.handlelogChange = this.handlelogChange.bind(this)
    this.handleInstChange = this.handleInstChange.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  handleTitle(event){
    this.setState({title: event.target.value})
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
      description: ''
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
      description: this.state.description
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
      <div className="small-centered gig_req_form">
      <form className="small-12 med-8 lg-6 small-centered">
        <TextField
          label='Heading'
          content={this.state.title}
          name='title'
          handlerFunction={this.handleTitle}
          />
        <br />
        <label>
          Gig Date:
        <Datetime
          onChange={this.handleDate}
          timeFormat={false}
          />
      </label>
      <label>
        Genre(s):
      <Select
        name="form-field-name"
        multi={true}
        value={this.state.genreTags}
        options={genres}
        onChange={this.handlelogChange}
        />
    </label>
      <label>Instrument(s):
        <Select
          name="form-field-name"
          multi={true}
          value={this.state.instrumentTags}
          options={instruments}
          onChange={this.handleInstChange}
          />
      </label>
          <TextField
            label='Description'
            content={this.state.description}
            name='description'
            handlerFunction={this.handleDescription}
            />
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
          <br />
          <button onClick={this.clearForm}>Clear</button> |
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default GigReqForm
