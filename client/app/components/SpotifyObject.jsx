import React, { Component } from 'react'

class SpotifyObject extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
    <div className="column column-block spotify-object">
        <div className="column small-4">
          <a href={this.props.preview}><img src={this.props.img} /></a>
          <button className="candy-button" onClick={this.props.onSubmit}>Add to my Profile</button>
        </div>
        <div className="column small-8">
          <p>Title: {this.props.name}</p>
          <br/>
          <p>Artist: {this.props.artist}</p>
          <br/>
          <p>Album: {this.props.album}</p>
      </div>
    </div>
    )
  }
}

export default SpotifyObject
