import React, {Component} from 'react';

class ProfileContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData: []
    }
  }

  componentDidMount(){
    let userId = this.props.params.id;
    fetch(`/api/v1/users/${userId}`)
    .then(response => response.json())
    .then(responseData => {
    this.setState({ userData: responseData })
  })
  }
  render(){
    return (
      
    );

  }
};

export default ProfileContainer;
