import React, { Component } from 'react'
import Genre from './Genre'
import Instrument from './Instrument'
class BandRequestTile extends Component{
  render(){
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
        <td>{this.props.title}</td>
        <td>{genreTags}</td>
        <td>{instrumentTags}</td>
        <td>{this.props.postDate}</td>
      </tr>

    )
  }
}

export default BandRequestTile
