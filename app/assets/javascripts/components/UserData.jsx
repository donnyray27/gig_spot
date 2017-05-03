class UserData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.user,
      instruments: this.props.instruments,
      genres: this.props.genres,
      gigs: this.props.gigs,
      gigRequests: this.props.gigRequests,
      bandRequests: this.props.bandRequests
    }
    this.handleGigUpdate = this.handleGigUpdate.bind(this)
  }


  handleGigUpdate(gig) {
      let userId = this.props.user.id
      fetch(`/api/v1/users/${userId}/gigs/${gig.id}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gig)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({ gigs: [response]});
      })
  }

  render() {
    return(
      <div>
        <div className="row">
            <ComboDatePicker order="mdy" minDate={new Date('2017-01-01')}
                                        maxDate={new Date('2018-12-31')}/>

        </div>

        <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
        <h2>{this.state.user.bio}</h2>
        <InstrumentsContainer instruments={this.state.instruments}/>
        <GenresContainer genres={this.state.genres} />
        <GigsContainer gigs={this.state.gigs}
          onUpdate={this.handleGigUpdate} />
        <GigRequestsContainer
          gigRequests={this.state.gigRequests}
          />
        <BandRequestsContainer bandRequests={this.state.bandRequests}/>
      </div>

    )
  }
}
