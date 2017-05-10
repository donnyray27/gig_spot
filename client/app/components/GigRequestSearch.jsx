import React, {Component} from 'react'
import Select from 'react-select'

class GigRequestSearch extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchDistance: [],
      location: '',
      genreTags: [],
      instrumentTags: []
    }
    this.handleDistance = this.handleDistance.bind(this)
    this.handlegenreChange = this.handlegenreChange.bind(this)
    this.handleInstChange = this.handleInstChange.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.generateSearchParams = this.generateSearchParams.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  generateSearchParams(){
    let distance = this.state.searchDistance.value
    let location = this.state.location
    let genres = this.parseSelect(this.state.genreTags)
    let instruments = this.parseSelect(this.state.instrumentTags)
    return {
      distance: distance,
      location: location,
      genres: genres,
      instruments: instruments
    }
  }
  handleLocation(event){
    this.setState({location: event.target.value})

  }

  handleDistance(val){
    this.setState({searchDistance: val})
  }

  handleSubmit(){
    query = this.generateSearchParams()
    this.props.handleSubmit(query)
  }

  handlegenreChange(val){
    this.setState({genreTags: val})
    let distance = this.state.searchDistance.value
    let location = this.state.location
    let genres = this.parseSelect(val)
    let instruments = this.parseSelect(this.state.instrumentTags)
    let query = {
      distance: distance,
      location: location,
      genres: genres,
      instruments: instruments
    }
    this.props.handleSubmit(query)
    //do the fetch with everything

  }

  handleInstChange(val){
    this.setState({instrumentTags: val})
    let distance = this.state.searchDistance.value
    let location = this.state.location
    let genres = this.parseSelect(this.state.genreTags)
    let instruments = this.parseSelect(val)
    let query = {
      distance: distance,
      location: location,
      genres: genres,
      instruments: instruments
    }
    this.props.handleSubmit(query)
  }

  parseSelect(arr){
    let returnValue = []
    arr.forEach((obj) => {
      returnValue.push(obj.value)
    })
    return returnValue
  }

  clearForm(event){
    event.preventDefault()
    this.setState({
      searchDistance: '',
      location: '',
      genreTags: [],
      instrumentTags: []
    })
  }




  render(){

    let distanceOptions = [
      {label: "", value: 0 },
      {label: "10", value: 10},
      {label: "20", value: 20},
      {label: "30", value: 30},
      {label: "40", value: 40},
      {label: "50", value: 50}
    ]

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
      <form>
        <div className="row">
          <div className="medium-6 lg-8 columns">
            <label>Input Label
              <input type="text"
                placeholder="Enter: City, State"
                onChange={this.handleLocation}/>
            </label>
          </div>
          <label>Miles From
          <Select
            name="Distance From"
            value={this.state.searchDistance}
            options={distanceOptions}
            onChange={this.handleDistance}/>
        </label>

        <label>
            Genre(s):
          <Select
            name="Genres"
            multi={true}
            value={this.state.genreTags}
            options={genres}
            onChange={this.handlegenreChange}
            />
        </label>
        <label>Instrument(s):
          <Select
            name="Instruments"
            multi={true}
            value={this.state.instrumentTags}
            options={instruments}
            onChange={this.handleInstChange}
            />
        </label>
          <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.clearForm}>Clear</button>
        </div>
      </form>
    )
  }
}

export default GigRequestSearch
