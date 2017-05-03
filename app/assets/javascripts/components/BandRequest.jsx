class BandRequest extends React.Component {

  render(){
    return(
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.name}</td>
        <td>{this.props.updatedAt}</td>
      </tr>
    )
  }
}
