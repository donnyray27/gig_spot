class Gig extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editable: false,
      venue: this.props.venue,
      address: this.props.address,
      dateTime: this.props.dateTime,
      description: this.props.description
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleVenueChange = this.handleVenueChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  handleVenueChange(event){
    this.setState({venue: event.target.value})
  }

  handleAddressChange(event){
    this.setState({address: event.target.value})
  }

  handleDateTimeChange(event){
    this.setState({dateTime: event.target.value})
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value})
  }

  handleEdit() {
    console.log('edit button clicked');
    let venue = this.state.venue;
    let address = this.state.address;
    let dateTime = this.state.dateTime;
    let description = this.state.description;
    let gig = {
      id: this.props.id,
      venue: venue,
      address: address,
      description: description,
      dateTime: dateTime,
    };
    this.props.handleUpdate(gig);
    this.setState({editable: !this.state.editable});
  }

  render(){
    let venue = this.state.editable ? <td><input type='text' defaultValue={this.props.venue} onChange={this.handleVenueChange} /></td> : <td>{this.props.venue}</td>;
    let address = this.state.editable ? <td><input type='text' defaultValue={this.props.address} onChange={this.handleAddressChange}/></td> : <td>{this.props.address}</td>;
    let dateTime = this.state.editable ? <td><input type='text' defaultValue={this.props.dateTime} onChange={this.handleDateTimeChange} /></td> : <td>{this.props.dateTime}</td>;
    let description = this.state.editable ? <td><input type='text' defaultValue={this.props.description} onChange={this.handleDescriptionChange} /></td>: <td>{this.props.description}</td>;

    return(
      <tr>
        {venue}
        {address}
        {dateTime}
        {description}
        <td><button onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button></td>
        <td><button onClick={this.props.handleDelete}>Delete</button></td>
      </tr>
    )
  }
}
