class UserData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: this.props.data,
      instruments: this.props.instruments,
      genres: this.props.genres,
      gigs: this.props.gigs,
      gigRequests: this.props.gigRequests,
      bandRequests: this.props.bandRequests
    }

  }


  render() {
    return(
      <div>
        <div className="row">
            <ComboDatePicker order="mdy" minDate={new Date('2017-01-01')}
                                        maxDate={new Date('2018-12-31')}/>

        </div>

        <h1>{this.state.data.first_name} {this.state.data.last_name}</h1>
        <h2>{this.state.data.bio}</h2>
        <InstrumentsContainer instruments={this.state.instruments}/>
        <GenresContainer genres={this.state.genres} />
        <GigsContainer gigs={this.state.gigs} />
        <GigRequestsContainer gigRequests={this.state.gigRequests} />
        <BandRequestsContainer bandRequests={this.state.bandRequests}/>
      </div>

    )
  }
}
