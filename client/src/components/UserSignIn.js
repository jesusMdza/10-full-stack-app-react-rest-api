import React from 'react';

class UserSignIn extends React.Component {

  state = {
    emailAddress: "",
    password: ""
  }

  handleUsernameValueChange = (e) => {
    this.setState({username: e.target.value});
  }

  handlePasswordValueChange = (e) => {
    this.setState({password: e.target.value});
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  render(){
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={ () => context.actions.signIn(emailAddress, password) }>
              <div>
                <input 
                  id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={ emailAddress }
                  onChange={ (e) => this.change(e) }  
                />
              </div>
              <div>
                <input 
                  id="password" name="password" type="password" className="" placeholder="Password" value={ password }
                  onChange={ (e) => this.change(e) }  
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push('/')}}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
        </div>
      </div>
    );
  }
}

export default UserSignIn;