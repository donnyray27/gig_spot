class InstrumentsIndex extends React.Component{

  render(){
    let instrumentCheckboxes = this.props.allInstruments.map(instrumentCheckBox => {
      return(
        <div key={instrumentCheckBox.id}>
          <input id={instrumentCheckBox.id} type="checkbox" /><label for={instrumentCheckBox.name}>{instrumentCheckBox.name}</label>
        </div>
      )
    })
    return(
      <div>
        <fieldset className="fieldset">
          {instrumentCheckboxes}
        </fieldset>
      </div>
    )
  }
}
