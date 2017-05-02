class GigsContainer extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let gigs = this.props.data.map(gig => {
        return(
        <Gig
          key={gig.id}
          venue={gig.venue}
          address={gig.address}
          datetime={gig.event_date}
          description={gig.description}
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
