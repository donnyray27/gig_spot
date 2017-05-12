import React, { Component } from 'react'

class UserTrack extends Component{
  constructor(props){
    super(props)
  }

  render(){
    let deleteButton;

    if (this.props.validUser) {
      deleteButton = <button className="candy-button" onClick={this.props.onDelete}>Remove</button>
    }
    return(
      <div className="column column-block small-centered spotify-tracks">
      <iframe src={'https://open.spotify.com/embed?uri=' + this.props.uri}
              width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
          {deleteButton}
      </div>
    )
  }
}

export default UserTrack
