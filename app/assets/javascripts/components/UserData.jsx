class UserData extends React.Component {
  constructor(props){
    super(props)

  }


  render() {
    return(
      <div>
        <div className="row">
            <ComboDatePicker order="mdy" minDate={new Date('2017-01-01')}
                                        maxDate={new Date('2018-12-31')}/>

        </div>

        <h1>{this.props.data.first_name} {this.props.data.last_name}</h1>
        <h2>{this.props.data.bio}</h2>
      </div>

    )
  }
}
