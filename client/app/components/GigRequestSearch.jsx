import React, {Component} from 'react'
import Select from 'react-select'

class GigRequestSearch extends Component{
  constructor(props){
    super(props)
    this.state = {
      genreTags: [],
      instrumentTags: []
    }
    this.handlegenreChange = this.handlegenreChange.bind(this)
    this.handleInstChange = this.handleInstChange.bind(this)
    this.parseSelect = this.parseSelect.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.generateSearchParams = this.generateSearchParams.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  generateSearchParams(){
    let genres = this.parseSelect(this.state.genreTags)
    let instruments = this.parseSelect(this.state.instrumentTags)
    return {
      genres: genres,
      instruments: instruments
    }
  }


  handleSubmit(){
    query = this.generateSearchParams()
    this.props.handleSubmit(query)
  }

  handlegenreChange(val){
    this.setState({genreTags: val})
    let genres = this.parseSelect(val)
    let instruments = this.parseSelect(this.state.instrumentTags)
    let query = {
      genres: genres,
      instruments: instruments
    }
    this.props.handleSubmit(query)
    //do the fetch with everything

  }

  handleInstChange(val){
    this.setState({instrumentTags: val})

    let genres = this.parseSelect(this.state.genreTags)
    let instruments = this.parseSelect(val)
    let query = {
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
      genreTags: [],
      instrumentTags: []
    })
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
      <div className="row search-div">
          <div className="small-12 large-5 columns">
        <label>
            Filter Gigs by Genre:
          <Select
            name="Genres"
            multi={true}
            value={this.state.genreTags}
            options={genres}
            onChange={this.handlegenreChange}
            />
        </label>
          </div>
          <div className="outer-and-or small-12 large-2 columns">
            <div className="small-6 small-centered circle">And/Or</div>
          </div>
          <div className="small-12 large-5 columns">
        <label>Filter Gigs by Instrument:
          <Select
            name="Instruments"
            multi={true}
            value={this.state.instrumentTags}
            options={instruments}
            onChange={this.handleInstChange}
            />
        </label>
        </div>
    </div>
    )
  }
}

export default GigRequestSearch
