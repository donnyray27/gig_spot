import React, {Component} from 'react'
import InstrumentUpdate from '../components/InstrumentUpdate'
class InstrumentUpdateContainer extends Component{
  constructor(props){
    super(props)
    this.onUpdate = this.onUpdate.bind(this)
  }
onUpdate(instrument){
  this.props.onUpdate(instrument)
}
      render(){

        let instrumentCheckBoxes = this.props.allInstruments.map(instrumentCheckBox => {
            if(this.props.userInstruments.includes(instrumentCheckBox)){
              return(
                <InstrumentUpdate
                  key={instrumentCheckBox.id}
                  name={instrumentCheckBox}
                  updateHander={this.onUpdate.bind(this, instrumentCheckBox)}
                  checked={true}
                  />
              )
            }else{
              return(
                <InstrumentUpdate
                  key={instrumentCheckBox.id}
                  name={instrumentCheckBox}
                  updateHander={this.onUpdate.bind(this, instrumentCheckBox)}
                  checked={false}
                  />
              )
            }
        })
        return(
            <form>
            {instrumentCheckBoxes}
          </form>
        )
      }
}

export default InstrumentUpdateContainer
