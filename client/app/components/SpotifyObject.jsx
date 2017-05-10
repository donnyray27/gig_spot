import React, { Component } from 'react'

class SpotifyObject extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
    <div className="column column-block spotify-object">
      <a href={this.props.preview}><img src={this.props.img} /></a>
      <p>Title: {this.props.name}</p>
      <p>Artist: {this.props.artist}</p>
      <p>Album: {this.props.album}</p>
      <button className="candy-button" onClick={this.props.onSubmit}>Add to my Profile</button>
    </div>
    )
  }
}

export default SpotifyObject
