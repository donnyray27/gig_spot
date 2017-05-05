import React, { Component } from 'react'
import GigRequestTile from '../components/GigRequestTile'

class GigRequestIndex extends Component{
  constructor(props){
    super(props)
    this.state = {
      gigsRequests: []
    }
  }

  componentWillMount(){
    this.setState({gigRequests: this.props.gigRequests})
  }
  render(){
    let gigIndex = this.state.gigRequests.map(gigRequest => {
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
    )
  }
}

export default GigRequestIndex
