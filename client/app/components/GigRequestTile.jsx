import React, { Component } from 'react'
import Genre from './Genre'
import Instrument from './Instrument'
import moment from 'moment'
class GigRequestTile extends Component{
  render(){
    let date = new Date(this.props.postDate)
    let formatDate = moment(date).format('ll')
      let genreTags = this.props.genres.map(genre => {
        return(
          <Genre
            key={genre.id}
            genreName={genre}
            />
        )
      })

      let instrumentTags = this.props.instruments.map(instrument => {
        return(
          <Instrument
            key={instrument.id}
            instrumentName={instrument}
            />
        )
      })
    return(
      <tr>
        <td><a href={'/gig_requests/' + this.props.id}>{this.props.title}</a></td>
        <td>{genreTags}</td>
        <td>{instrumentTags}</td>
        <td><a href={'/users/' + this.props.user.id }>{this.props.user.first_name} {this.props.user.last_name}</a></td>
        <td>{formatDate}</td>
      </tr>

    )
  }
}

export default GigRequestTile
