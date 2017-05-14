import React, { Component } from 'react'
import moment from 'moment'
import Instrument from './Instrument'
import Genre from './Genre'
class AuditionShow extends Component{
  constructor(props){
    super(props)
    this.state = {
      date: ''
    }
  }

  render(){
    let genreTags = this.props.gigRequest.genres.map(genre => {
      return(
        <Genre
          key={genre.id}
          genreName={genre}
          />
      )
    })

    let instrumentTags = this.props.gigRequest.instruments.map(instrument => {
      return(
        <Instrument
          key={instrument.id}
          instrumentName={instrument}
          />
      )
    })

    return(
      <div className="row">
        <div className="small-12 large-8 small-centered gig-details">
        <h1>{this.props.gigRequest.details.title}</h1>
        <h6>{this.state.date}</h6>
        <div>{genreTags}</div>
        <div>{instrumentTags}</div>
        <h4>{this.props.gigRequest.details.address}</h4>
        </div>
      </div>
    )
  }
}

export default AuditionShow
