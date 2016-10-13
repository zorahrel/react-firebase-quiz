import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: ''
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleClick() {
    this.props.onSubmit(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="text-left" style={{margin: "0 auto", maxWidth: "400px"}}>
        <div className="input-field">
          <input id="email" placeholder="Email" onChange={this.handleEmailChange.bind(this)} type="email"/>
        </div>
        <div className="input-field">
          <input id="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)} type="password"/>
        </div>
        <button className="waves-effect waves-light btn-large" onClick={this.handleClick.bind(this)}>Login</button>
      </div>
    )
  }
};

export default Login;
