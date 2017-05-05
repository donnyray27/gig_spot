import React, { Component } from 'react'
import BandRequest from '../components/BandRequest'

class BandRequestsContainer extends Component {
  constructor(props){
    super(props)
  }


  render(){
      let bandRequests = this.props.bandRequests.map(bandRequest => {
        return(
          <BandRequest
            key={bandRequest.id}
            title={bandRequest.title}
            name={bandRequest.name}
            updatedAt={bandRequest.updated_at}
            />
      )
    })
    return(
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Band Name</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {bandRequests}
      </tbody>
    </table>
    )
  }
}

export default BandRequestsContainer
