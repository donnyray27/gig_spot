import React, { Component } from 'react'
import Genre from '../components/Genre'

class GenresContainer extends Component {
  constructor(props){
    super(props)
  }


  render(){


      let genres = this.props.genres.map(genre => {
        return(
        <Genre
          key={genre.id}
          genreName={genre}
          />
      )
    })
    return(
      <div>
        {genres}
    </div>
    )
  }
}

export default GenresContainer
