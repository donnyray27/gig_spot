class GigRequestsContainer extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let gigRequests = this.props.gigRequests.map(gigRequest => {
        return(
          <GigRequest
            key={gigRequest.id}
            title={gigRequest.title}
            updatedAt={gigRequest.updated_at}
            />
        
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
