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
       this.props.handleGigDelete(id)
   }

  render(){
      let gigs = this.props.gigs.map(gig => {
        return(
        <Gig
          key={gig.data.id}
          id={gig.data.id}
          venue={gig.data.venue}
          address={gig.data.address}
          dateTime={gig.data.event_date}
          description={gig.data.description}
          genres={gig.genres}
          allGenres = {this.props.genres}
          handleUpdate={this.onUpdate}
          handleDelete={this.onDelete.bind(this, gig.data.id)}
          />
      )
    })
    return(
      <div className="gigs-table">
    <table>
      <thead>
        <tr>
          <th>Venue</th>
          <th>Address</th>
          <th>Date & Time</th>
          <th>Description</th>
          <th>Genre(s)</th>
        </tr>
      </thead>

      <tbody>
        {gigs}
      </tbody>
    </table>
  </div>
    )
  }
}

export default GigsContainer
