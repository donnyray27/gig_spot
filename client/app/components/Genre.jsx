import React, { Component } from 'react'

class Genre extends Component {
  constructor(props){
    super(props)
  }


  render(){

    return(
      <p>{this.props.genre}</p>
    )
  }
}

export default Genre
