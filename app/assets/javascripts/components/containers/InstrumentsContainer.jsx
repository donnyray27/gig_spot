class InstrumentsContainer extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let instruments = this.props.instruments.map(instrument => {
        return(
        <Instrument
          key={instrument.id}
          instrumentName={instrument.name}
          />
      )
    })
    return(
      <div>
      {instruments}
    </div>
    )
  }
}
