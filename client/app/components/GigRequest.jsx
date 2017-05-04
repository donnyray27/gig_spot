import React, { Component } from 'react'
class GigRequest extends Component {



  render(){
    return(
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.updatedAt}</td>
      </tr>
    )
  }
}

export default GigRequest
