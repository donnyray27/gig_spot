import React, { Component } from 'react'

class Instrument extends Component {
  constructor(props){
    super(props)
  }


  render(){

    return(
      <div className="tag">{this.props.instrumentName}</div>
    )
  }
}

export default Instrument
