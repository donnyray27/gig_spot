import React, {Component} from 'react'

class GenreUpdate extends Component{
  render(){
    return(
      <div>
        <input type="checkbox" defaultChecked={this.props.checked} onChange={this.props.updateHander}/><label>{this.props.name}</label>
      </div>
    )
  }
}

export default GenreUpdate
