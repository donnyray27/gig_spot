class BandRequestsContainer extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let bandRequests = this.props.data.map(bandRequest => {
        return(
          <tr key={bandRequest.id}>
            <td>{bandRequest.title}</td>
            <td>{bandRequest.name}</td>
            <td>{bandRequest.updated_at}</td>
          </tr>
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
