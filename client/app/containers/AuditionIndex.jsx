import React, { Component } from 'react'
import Audition from '../components/Audition'
class AuditionIndex extends Component{
  constructor(props){
    super(props)
    this.onDelete = this.onDelete.bind(this)
  }
  onDelete(id){
    this.props.handleDeleteAudition(id)
  }

  render(){
    let videos = this.props.auditions.map(audition => {
      return(
        <Audition data={audition}
          handleDelete={this.onDelete.bind(this, audition[0])}/>
      )
    })
    return(
      <div>
        {videos}
      </div>
    )
  }
}

export default AuditionIndex
