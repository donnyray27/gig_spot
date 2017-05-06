import React, {Component} from 'react'
import Select from 'react-select'
class InstrumentUpdateContainer extends Component{
  constructor(props){
    super(props)
      this.state = {
        checkedInstruments: []
      }
    this.parseSelect = this.parseSelect.bind(this)
    this.handleInstrumentChange = this.handleInstrumentChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  componentWillMount(){
    let preSelected = this.props.userInstruments.map(instrument => {
      return(
        {value: instrument, label: instrument}
      )
    })
    this.setState({checkedInstruments: preSelected})
  }

  parseSelect(arr){
    let returnValue = []
    arr.forEach((obj) => {
      returnValue.push(obj.value)
    })
    return returnValue
  }

  handleUpdate(val){
    this.setState({checkedInstruments: val})
  }
  handleInstrumentChange(){
    let instrument = this.parseSelect(this.state.checkedInstruments)
    this.props.onUpdate(instrument)
  }

      render(){

        let allInstruments = this.props.allInstruments.map(instrument => {
          return(
            {value: instrument, label: instrument}
          )
        })

        return(
          <div>
            <Select
              name="Instruments"
              multi={true}
              value={this.state.checkedInstruments}
              options={allInstruments}
              onChange={this.handleUpdate}/>
            <button onClick={this.handleInstrumentChange}>Done</button>
          </div>
        )
      }
}

export default InstrumentUpdateContainer
