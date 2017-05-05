import React, { Component } from 'react'
import Gig from '../components/Gig'

class GigsContainer extends Component {
  constructor(props){
    super(props)
    this.onUpdate = this.onUpdate.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onUpdate(gig) {
      this.props.onUpdate(gig);
  }

  onDelete(id) {
       this.props.handleDelete(id)
   }

  render(){
      let gigs = this.props.gigs.map(gig => {
        return(
        <Gig
          key={gig.id}
          id={gig.id}
          venue={gig.venue}
          address={gig.address}
          dateTime={gig.event_date}
          description={gig.description}
          handleUpdate={this.onUpdate}
          handleDelete={this.onDelete.bind(this, gig.id)}
          />
      )
    })
    return(
    <table>
      <thead>
        <tr>
          <th>Venue</th>
          <th>Address</th>
          <th>Date/Time</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {gigs}
      </tbody>
    </table>
    )
  }
}

export default GigsContainer
