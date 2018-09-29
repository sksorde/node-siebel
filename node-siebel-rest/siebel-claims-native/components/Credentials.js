import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Credentials extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      password:'',
      data: ''
    };
  }
  onUserChange = e => {
    this.setState({username : e.target.value});
  }

  onPwdChange = e => {
    this.setState({password : e.target.value});
  }

  onClick = (e) => {
    e.preventDefault();
    // send the creds to siebel
    var url = 'https://129.150.203.202:16691/siebel/v1.0/data/Contact/?searchspec=([ Login Name] = ‘ANU’)';
    //var body = {SWEUserName : this.state.username, SWEPassword: this.state.password};
    fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin,
        credentials: "omit",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic this.state.username:this.state.password",
        },
        //body: JSON.stringify(body), // body data type must match "Content-Type" header
    })
    .then(response => response
          .console.log(response)
          .this.setState({data: response})
        )
        .catch(error => console.error(error)
               .this.setState({data: JSON.stringify(error)}));

  }
  render() {
    return (
      <div>
        <input placeholder="Username" value={this.state.username}
           onChange={this.onUserChange}/>
           <br/>
        <input placeholder="password" value={this.state.password}
           onChange={this.onPwdChange}/>
           <br/>
        <Button shadowsize={2} color="blue" onClick={this.onClick}>Login</Button>
        <br/>
        {this.state.data === '' ? 'no credentials to send' : this.state.data}
      </div>
    );
  }
}

export default Credentials;
