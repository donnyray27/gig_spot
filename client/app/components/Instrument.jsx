import React, { Component } from 'react'

class Instrument extends Component {
  constructor(props){
    super(props)
  }


  render(){

    return(
      <p>{this.props.instrumentName}</p>
    )
  }
}

export default Instrument
