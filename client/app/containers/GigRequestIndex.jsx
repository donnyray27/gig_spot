import React, { Component } from 'react'
import GigRequestTile from '../components/GigRequestTile'
import GigRequestSearch from '../components/GigRequestSearch'
import GigReqForm from './GigReqForm'
import Select from 'react-select'
class GigRequestIndex extends Component{
  constructor(props){
    super(props)
    this.state = {
      gigReqs: [],
      newRequest: false,
      noSearchResults: false
    }
    this.handleNewGigReq = this.handleNewGigReq.bind(this)
    this.handleFormToggle = this.handleFormToggle.bind(this)
    this.handleSearchGig = this.handleSearchGig.bind(this)
  }

  componentWillMount(){
    this.setState({gigReqs: this.props.gigRequests})
  }


  handleSearchGig(searchParams){
    let query = searchParams

    fetch(`gig_requests/1`, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
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
      if(response.length < 1){
        this.setState({noSearchResults: true})
      }else{
        this.setState({noSearchResults: false})
      }
      this.setState({ gigReqs: response});
    })
}

  handleFormToggle(){
    this.setState({newRequest: !this.state.newRequest})
  }
  handleNewGigReq(gigReq) {
        let newGigReq = gigReq
        fetch(`/api/v1/gig_requests`, {
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGigReq)
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
          this.setState({ gigReqs: response});
        })
        this.setState({newRequest: !this.state.newRequest})
    }

  render(){
    let gigIndex = this.state.gigReqs.map(gigRequest => {
      return(
        <GigRequestTile
          key={gigRequest.details.id}
          id={gigRequest.details.id}
          title={gigRequest.details.title}
          postDate={gigRequest.details.created_at}
          genres={gigRequest.genres}
          instruments={gigRequest.instruments}
          location={gigRequest.details.address}
          user={gigRequest.user}
          />
      )
    })

    let revealForm = this.state.newRequest ? <GigReqForm className="small-centered"
                                              allGenres={this.props.allGenres}
                                              allInstruments={this.props.allInstruments}
                                              onSubmit={this.handleNewGigReq}
                                              onCancel={this.handleFormToggle}/> :
                                              <div>
                                                <button className="enjoy-css" onClick={this.handleFormToggle}>Post a Request</button>
                                              </div>


    let gigSearchResults;
      if(this.state.noSearchResults === true){
        gigSearchResults = <h3 className="search-error">Your Search didn't yield any results</h3>
      }

    return(
      <div>
        <GigRequestSearch
          allGenres={this.props.allGenres}
          allInstruments={this.props.allInstruments}
          handleSubmit = {this.handleSearchGig}
          />
        {revealForm}
        {gigSearchResults}
        <div className="row gig-req-table">
        <div className="request-tile">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre(s)</th>
              <th>Instrument(s)</th>
              <th>Location</th>
              <th>Posted By</th>
              <th>Post Date</th>
            </tr>
          </thead>
          <tbody>
            {gigIndex}
          </tbody>
        </table>
      </div>
      </div>
    </div>
    )
  }
}

export default GigRequestIndex
