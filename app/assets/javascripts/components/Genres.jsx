class Genres extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let genres = this.props.data.map(genre => {
        return(
        <p key={genre.id}>{genre.name}</p>
      )
    })
    return(
      <div>
      {genres}
    </div>
    )
  }
}
