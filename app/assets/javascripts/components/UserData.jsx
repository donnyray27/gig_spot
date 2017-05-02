class UserData extends React.Component {
  constructor(props){
    super(props)

  }


  render() {
    return(
      <div>
        <h1>{this.props.data.first_name} {this.props.data.last_name}</h1>
        <h2>{this.props.data.bio}</h2>
      </div>

    )
  }
}
