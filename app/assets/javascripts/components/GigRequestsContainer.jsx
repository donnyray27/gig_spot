class GigRequestsContainer extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let gigRequests = this.props.data.map(gigRequest => {
        return(
          <tr key={gigRequest.id}>
            <td>{gigRequest.title}</td>
            <td>{gigRequest.updated_at}</td>
          </tr>
      )
    })
    return(
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {gigRequests}
      </tbody>
    </table>
    )
  }
}
