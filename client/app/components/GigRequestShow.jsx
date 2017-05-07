import React, { Component } from 'react'
import Instrument from './Instrument'
import Genre from './Genre'
import Datetime from 'react-datetime'
import Select from 'react-select'
import moment from 'moment'
import { browserHistory } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class GigRequestShow extends Component{
  constructor(props){
    super(props)
    this.state = {
      gigRequest: {},
      editable: false,
      title: '',
      date: '',
      genreTags: [],
      instrumentTags: [],
      description: ''
    }
    this.handleDate = this.handleDate.bind(this)
    this.handlelogChange = this.handlelogChange.bind(this)
    this.handleInstChange = this.handleInstChange.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentWillMount(){

    let genreDefaults = this.props.gigRequest.genres.map(genre => {
      return(
        {value: genre, label: genre}
      )
    })

    let instrumentDefaults = this.props.gigRequest.instruments.map(instrument => {
      return(
        {value: instrument, label: instrument}
      )
    })

    let date = new Date(this.props.gigRequest.details.event_date)
    let goodDate = moment(date).add(4, 'hours').format('ll');

    this.setState({
      gigRequest: this.props.gigRequest,
      date: goodDate,
      title: this.props.gigRequest.details.title,
      genreTags: genreDefaults,
      instrumentTags: instrumentDefaults,
      description: this.props.gigRequest.details.description
    })

  }


  handleDate(event){
    let date = new Date(event._d)
    let goodDate = moment(date).format('ll');
    this.setState({date: goodDate})
  }

  handlelogChange(val){
    this.setState({genreTags: val})
  }

  handleInstChange(val){
    this.setState({instrumentTags: val})
  }

  handleTitle(event){
    this.setState({title: event.target.value})
  }

  handleDescription(event){
    this.setState({description: event.target.value})
  }

  parseSelect(arr){
    let returnValue = [];
    arr.forEach((obj) => {
      returnValue.push(obj.value)
    })
    return returnValue
  }

  handleEdit(event){
    event.preventDefault()
    let genres = this.parseSelect(this.state.genreTags)
    let instruments = this.parseSelect(this.state.instrumentTags)

    let payload = {
      id: this.state.gigRequest.details.id,
      title: this.state.title,
      event_date: this.state.date,
      genres: genres,
      instruments: instruments,
      description: this.state.description
    }
    this.handleSubmit(payload)
    this.setState({editable: !this.state.editable})
  }

  handleSubmit(gigUpdate) {
        let id = this.state.gigRequest.details.id
        fetch(`/api/v1/gig_requests/${id}`, {
        credentials: 'same-origin',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigUpdate)
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
          this.setState({ gigRequest: response});
        })
    }

    handleDelete() {
          let id = this.state.gigRequest.details.id
        if(confirm("Are you sure you want to delete this?") == true){
          fetch(`/gig_requests/${id}`, {
          credentials: 'same-origin',
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        const path = `/gig_requests`
        browserHistory.push(path)
        }

      }


  render(){
    let genreTags = this.state.gigRequest.genres.map(genre => {
      return(
        <Genre
          key={genre.id}
          genreName={genre}
          />
      )
    })
    let genreOptions = this.props.allGenres.map(genre => {
      return(
        {value: genre, label: genre}
      )
    })

    let instrumentTags = this.state.gigRequest.instruments.map(instrument => {
      return(
        <Instrument
          key={instrument.id}
          instrumentName={instrument}
          />
      )
    })

    let instrumentOptions = this.props.allInstruments.map(instrument => {
      return(
        {value: instrument, label: instrument}
      )
    })

    let title = this.state.editable ? <h1><input type='text' defaultValue={this.state.title} onChange={this.handleTitle}/></h1> : <h1>{this.state.gigRequest.details.title}</h1>
  let date = this.state.editable ? <h6><Datetime onChange={this.handleDate} timeFormat={false} defaultValue={this.state.date}/></h6> : <h6>{this.state.date}</h6>
  let genres = this.state.editable ? <Select name="form-field-name" multi={true} value={this.state.genreTags} options={genreOptions} onChange={this.handlelogChange}/> : <div>{genreTags}</div>
let instruments = this.state.editable ? <Select name="form-field-name" multi={true} value={this.state.instrumentTags} options={instrumentOptions} onChange={this.handleInstChange}/> : <div>{instrumentTags}</div>
let description = this.state.editable ? <h3><input type='text' defaultValue={this.state.description} onChange={this.handleDescription}/></h3> : <h3>{this.state.gigRequest.details.description}</h3>
    return(
      <div>
        <Tabs>
           <TabList>
             <Tab>Info</Tab>
             <Tab>Auditions</Tab>
           </TabList>

           <TabPanel>
             {title}
             {date}
             {genres}
             {instruments}
             {description}
             <button onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button>
             <button onClick={this.handleDelete}>Delete</button>
           </TabPanel>
           <TabPanel>

           </TabPanel>
         </Tabs>
      </div>
    )
  }
}

export default GigRequestShow
