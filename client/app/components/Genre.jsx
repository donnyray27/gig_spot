import React, { Component } from 'react'

class Genre extends Component {
  constructor(props){
    super(props)
  }


  render(){

    return(
      <div className="tag">{this.props.genreName}</div>
    )
  }
}

export default Genre
