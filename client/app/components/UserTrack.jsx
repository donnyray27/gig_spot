import React, { Component } from 'react'

class UserTrack extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
      <iframe src={'https://open.spotify.com/embed?uri=' + this.props.uri}
              width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
            <button onClick={this.props.onDelete}>Remove</button>
      </div>
    )
  }
}

export default UserTrack
