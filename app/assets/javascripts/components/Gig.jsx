class Gig extends React.Component {
  render(){
    return(
      <tr>
        <td>{this.props.venue}</td>
        <td>{this.props.address}</td>
        <td>{this.props.datetime}</td>
        <td>{this.props.description}</td>
      </tr>
    )
  }
}
