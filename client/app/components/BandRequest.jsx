import React, { Component } from 'react'
import moment from 'moment'
class BandRequest extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateUpdated: ''
    }
  }
  componentWillMount(){
    let date = new Date(this.props.updatedAt)
    let goodDate = moment(date).format('dddd MMMM Do YYYY, h:mm a');
    this.setState({dateUpdated: goodDate})
  }

  render(){
    return(
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.name}</td>
        <td>{this.state.dateUpdated}</td>
      </tr>
    )
  }
}

export default BandRequest
