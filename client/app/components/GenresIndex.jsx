class GenresIndex extends React.Component {

  render(){



    let genreCheckboxes = this.props.allGenres.map(genreCheckBox => {
      return(
        <div key={genreCheckBox.id}>
          <input id={genreCheckBox.id} type="checkbox" /><label for={genreCheckBox.name}>{genreCheckBox.name}</label>
        </div>
      )

    })
    return(
      <div>
        <fieldset className="fieldset">
          {genreCheckboxes}
        </fieldset>
      </div>
    )
  }
}
