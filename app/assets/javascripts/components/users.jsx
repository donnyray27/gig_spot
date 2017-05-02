class Users extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        myName: "Raymond",
        numClicks: 0
      }
      this.handleClick = this.handleClick.bind(this)
  }

handleClick(){
  let newNum = this.state.numClicks + 1
  this.setState({numClicks: newNum})
}

  render() {
    return(
      <div>
        <h1>{this.props.name}</h1>
        <h2>{this.state.myName}</h2>
        <h3 onClick={this.handleClick}>{this.state.numClicks}</h3>
      </div>

    )
  }
}
