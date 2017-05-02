class Instruments extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
      let instruments = this.props.data.map(instrument => {
        return(
        <p key={instrument.id}>{instrument.name}</p>
      )
    })
    return(
      <div>
      {instruments}
    </div>
    )
  }
}
