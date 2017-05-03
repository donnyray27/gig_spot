class GenresContainer extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let genres = this.props.genres.map(genre => {
        return(
        <Genre
          key={genre.id}
          genre={genre.name}
          />
      )
    })
    return(
      <div>
      {genres}
    </div>
    )
  }
}
