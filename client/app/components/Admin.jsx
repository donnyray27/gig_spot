import React, { Component } from 'react'

class Admin extends Component{
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentWillMount(){
    this.setState({users: this.props.users})
  }

  handleDeleteUser(id) {
   if(confirm("Are you sure you want to delete this member?") == true){
    fetch(`/api/v1/users/${id}`, {
    credentials: 'same-origin',
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ users: response});
    })
    }
  }

  render(){
    let users = this.state.users.map(user => {
      return(
        <div key={user.id}>
        <li className="user-tile">
          <a href={`/users/${user.id}`}>
            <img src={user.avatar.url} height="50px" width="50px"/>  {user.first_name} {user.last_name}
          </a>
          <button className="clear-cancel" onClick={this.handleDeleteUser.bind(this, user.id)}>Delete User</button>
        </li>
      </div>
      )
    })
    return(
      <div className="row">
        <h2>Member List</h2>
        <ul className="no-bullet">
          {users}
        </ul>
    </div>
    )
  }
}

export default Admin
