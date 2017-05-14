import React, {Component} from 'react'
import Select from 'react-select'
class GenreUpdateContainer extends Component{
  constructor(props){
    super(props)
      this.state = {
        checkedGenres: []
      }
    this.parseSelect = this.parseSelect.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  componentWillMount(){
    let preSelected = this.props.userGenres.map(genre => {
      return(
        {value: genre, label: genre}
      )
    })
    this.setState({checkedGenres: preSelected})
  }

  parseSelect(arr){
    let returnValue = []
    arr.forEach((obj) => {
      returnValue.push(obj.value)
    })
    return returnValue
  }

  handleUpdate(val){
    this.setState({checkedGenres: val})
  }
  handleGenreChange(){
    let genre = this.parseSelect(this.state.checkedGenres)
    this.props.onUpdate(genre)
  }

      render(){

        let allGenres = this.props.allGenres.map(genre => {
          return(
            {value: genre, label: genre}
          )
        })

        return(
          <div className="genre-select">
            <Select
              name="Genres"
              multi={true}
              value={this.state.checkedGenres}
              options={allGenres}
              onChange={this.handleUpdate}/>
            <button className="candy-button" onClick={this.handleGenreChange}>Done</button>
          </div>
        )
      }
}

export default GenreUpdateContainer
