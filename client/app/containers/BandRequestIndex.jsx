import React, { Component } from 'react'
import BandRequestTile from '../components/BandRequestTile'

class BandRequestIndex extends Component{
  constructor(props){
    super(props)
    this.state = {
      bandReqs: []
    }
  }

  componentWillMount(){
    this.setState({bandReqs: this.props.bandReqs})
  }
  render(){
    let bandIndex = this.state.bandReqs.map(bandReq => {
      return(
        <BandRequestTile
          key={bandReq.details.id}
          id={bandReq.details.id}
          title={bandReq.details.title}
          postDate={bandReq.details.created_at}
          genres={bandReq.genres}
          instruments={bandReq.instruments}
          />
      )
    })
    return(
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
          {bandIndex}
        </tbody>
      </table>
    )
  }
}

export default BandRequestIndex
