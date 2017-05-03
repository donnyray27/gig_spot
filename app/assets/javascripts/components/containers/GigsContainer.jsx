class GigsContainer extends React.Component {
  constructor(props){
    super(props)
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(gig) {
      this.props.onUpdate(gig);
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
