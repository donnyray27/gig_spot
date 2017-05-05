import React, { Component } from 'react'

class Genre extends Component {
  constructor(props){
    super(props)
  }


  render(){

    return(
      <p>{this.props.genreName}</p>
    )
  }
}

export default Genre
