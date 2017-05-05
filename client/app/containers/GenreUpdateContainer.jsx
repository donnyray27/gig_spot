import React, {Component} from 'react'
import GenreUpdate from '../components/GenreUpdate'
class GenreUpdateContainer extends Component{
  constructor(props){
    super(props)
    this.onUpdate = this.onUpdate.bind(this)
  }
onUpdate(genre){
  this.props.onUpdate(genre)
}
      render(){

        let genreCheckBoxes = this.props.allGenres.map(genreCheckBox => {
            if(this.props.userGenres.includes(genreCheckBox)){
              return(
                <GenreUpdate
                  key={genreCheckBox.id}
                  name={genreCheckBox}
                  updateHander={this.onUpdate.bind(this, genreCheckBox)}
                  checked={true}
                  />
              )
            }else{
              return(
                <GenreUpdate
                  key={genreCheckBox.id}
                  name={genreCheckBox}
                  updateHander={this.onUpdate.bind(this, genreCheckBox)}
                  checked={false}
                  />
              )
            }
        })
        return(
            <form>
            {genreCheckBoxes}
          </form>
        )
      }
}

export default GenreUpdateContainer
