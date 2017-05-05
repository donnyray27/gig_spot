import React, { Component } from 'react'
import GigRequestTile from '../components/GigRequestTile'
import GigReqForm from './GigReqForm'

class GigRequestIndex extends Component{
  constructor(props){
    super(props)
    this.state = {
      gigReqs: []
    }
    this.handleNewGigReq = this.handleNewGigReq.bind(this)
  }

  componentWillMount(){
    this.setState({gigReqs: this.props.gigRequests})
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
          />
      )
    })
    return(
      <div>
      <GigReqForm
        allGenres={this.props.allGenres}
        allInstruments={this.props.allInstruments}
        onSubmit={this.handleNewGigReq}/>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre(s)</th>
              <th>Instrument(s)</th>
              <th>Post Date</th>
            </tr>
          </thead>
          <tbody>
            {gigIndex}
          </tbody>
        </table>
      </div>
    )
  }
}

export default GigRequestIndex
