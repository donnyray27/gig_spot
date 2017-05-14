import React, {Component} from 'react'
import Select from 'react-select';

class InstrumentsIndex extends Component{


  logChange(val){
    console.log("Selected: " + val);
  }
  render(){

    let options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ];
    return(
      <Select
          name="form-field-name"
          value="one"
          options={options}
          multi={true}
          onChange={this.logChange}
          />
    )
  }
}

export default InstrumentsIndex
