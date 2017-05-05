import React, { Component } from 'react'

class BandRequest extends Component {

  render(){
    return(
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.name}</td>
        <td>{this.props.updatedAt}</td>
      </tr>
    )
  }
}

export default BandRequest
