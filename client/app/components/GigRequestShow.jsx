import React, { Component } from 'react'
import Instrument from './Instrument'
import Genre from './Genre'
import Datetime from 'react-datetime'
import Select from 'react-select'
import moment from 'moment'
import { browserHistory } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AuditionIndex from '../containers/AuditionIndex'

class GigRequestShow extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: '',
      gigRequest: {},
      editable: false,
      title: '',
      date: '',
      genreTags: [],
      instrumentTags: [],
      description: '',
      location: '',
      auditions: [],
      errors: {}
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
    this.handleDeleteAudition = this.handleDeleteAudition.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.validateDate = this.validateDate.bind(this)
    this.validateLocation = this.validateLocation.bind(this)
    this.validateDescription = this.validateDescription.bind(this)
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
      id: this.props.gigRequest.details.id,
      gigRequest: this.props.gigRequest,
      date: goodDate,
      title: this.props.gigRequest.details.title,
      genreTags: genreDefaults,
      instrumentTags: instrumentDefaults,
      description: this.props.gigRequest.details.description,
      location: this.props.gigRequest.details.address,
      auditions: this.props.gigRequest.auditions
    })

  }

  validateDate(input){
    if(input === "Invalid date" || input === ''){
      let newError = {date: 'Please select a valid date'}
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
    let goodDate = moment(date).format('ll');
    this.validateDate(goodDate)
    this.setState({date: goodDate})
  }

  validateLocation(input){
    let regex = /^\s|^\s+/g
    if(input.match(regex) || input === ''){
      let newError = {location: 'Location is a required field'}
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
  handlelogChange(val){
    this.setState({genreTags: val})
  }

  handleInstChange(val){
    this.setState({instrumentTags: val})
  }

  validateTitle(input){
    let regex = /^\s|^\s+/g
    if(input.match(regex) || input === ''){
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

  validateDescription(input){
    let regex = /^\s|^\s+/g
    if(input.match(regex) || input === ''){
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
    if (this.validateTitle(this.state.title) &&
        this.validateDate(this.state.date) &&
        this.validateDescription(this.state.description) &&
        this.validateLocation(this.state.location)
      ) {
        let payload = {
          id: this.state.gigRequest.details.id,
          title: this.state.title,
          event_date: this.state.date,
          genres: genres,
          instruments: instruments,
          location: this.state.location,
          description: this.state.description
        }
        this.handleSubmit(payload)
        this.setState({
          editable: !this.state.editable,
          errors: {}
        })
      }else{
        this.setState({editable: true})
      }
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
          .then(response => {
            if (response.ok) {
              window.location.href = '/gig_requests'
            } else {
              let errorMessage = `${response.status} (${response.statusText})`,
                  error = new Error(errorMessage);
              throw(error);
            }
          })
        }
      }

    handleDeleteAudition(id){
      let gigId = this.state.gigRequest.details.id
        if(confirm("Are you sure you want to delete this?") == true){
          fetch(`/api/v1/gig_requests/${gigId}/auditions/${id}`, {
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
          console.log(response)
          this.setState({ auditions: response });
        })
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
    let editDeleteButtons;
    if (this.props.validUser) {
      editDeleteButtons= <div>
                          <button className="inverted-candy" onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button> | <button className="inverted-candy" onClick={this.handleDelete}>Delete</button>
                        </div>
    }

    let auditionTab;
    let auditionVideos;
    if (this.props.validUser) {
      auditionTab = <Tab>Auditions</Tab>
    }

    let title = this.state.editable ? <h3><input type='text' defaultValue={this.state.title} onChange={this.handleTitle}/></h3> : <h1>{this.state.gigRequest.details.title}</h1>
  let date = this.state.editable ? <h6 className="date-edit"><Datetime isValidDate={valid} onChange={this.handleDate} timeFormat={false} defaultValue={this.state.date} closeOnSelect={true}/></h6> : <h5>Gig Date: {this.state.date}</h5>
  let genres = this.state.editable ? <Select name="form-field-name" multi={true} value={this.state.genreTags} options={genreOptions} onChange={this.handlelogChange}/> : <div>{genreTags}</div>
let instruments = this.state.editable ? <Select name="form-field-name" multi={true} value={this.state.instrumentTags} options={instrumentOptions} onChange={this.handleInstChange}/> : <div>{instrumentTags}</div>
let location = this.state.editable ? <h4><input type='text' defaultValue={this.state.location} onChange={this.handleLocation}/></h4> : <h3>{this.state.gigRequest.details.address}</h3>
let description = this.state.editable ? <h5><textarea type='text' defaultValue={this.state.description} onChange={this.handleDescription}></textarea></h5> : <h3>{this.state.gigRequest.details.description}</h3>



    return(
      <div>
        <Tabs>
           <TabList>
             <Tab>Info</Tab>
             {auditionTab}
           </TabList>

           <TabPanel>
            <div className="row">
              {errorDiv}
             <div className="gig-req-show">
             {title}
             <a href={'/users/' + this.state.gigRequest.user.id}>
               <h4>Posted by {this.state.gigRequest.user.first_name} {this.state.gigRequest.user.last_name}</h4>
              </a>
             {date}
             {genres}
             {instruments}
             {location}
             {description}
             {editDeleteButtons}
             <br/>
             <br/>
             <button className="go-to-audition"><a href={'/gig_requests/' + this.state.id + '/auditions/new'}>Submit an Audition for this Gig</a></button>
             <br/>
             </div>
           </div>
           </TabPanel>
           <TabPanel>
             <div className="row">
               <div className="small-12 small-centered audition-index">
              <AuditionIndex
                auditions={this.state.auditions}
                handleDeleteAudition ={this.handleDeleteAudition}/>
            </div>
          </div>
           </TabPanel>
         </Tabs>
      </div>
    )
  }
}

export default GigRequestShow
