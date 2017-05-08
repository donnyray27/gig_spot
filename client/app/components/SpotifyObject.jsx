import React, { Component } from 'react'

class SpotifyObject extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
    <div>
      <img src={this.props.album.images[2]} />
      <p>{this.props.name}</p>
      <p>{this.props.artists[0].name}</p>
      <p>{this.props.album.name}</p>
    </div>
    )
  }
}

export default SpotifyObject
