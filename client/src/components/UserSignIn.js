import React from 'react';
import FormErrors from './FormErrors';

class UserSignIn extends React.Component {

  state = {
    emailAddress: "",
    password: "",
    errors: []
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  submit = (e, username, password) => {
    e.preventDefault();
    const { context } = this.props;
    const { from } = this.props.location.state || { from: "/" };

    context.actions.signIn(username, password)
      .then(user => {
        if (user === null) {
          e.persist(); // Keeps reference of synthetic event within an async callback
          this.setState({ errors: ["Sign-in unsuccessful."]});
        } else {
          this.setState({ errors: [] });
          this.props.history.push(from);
        }
      })
      .catch(err => {
        this.props.history.push("/error");
      });
  }

  render(){
    const { emailAddress, password, errors } = this.state;

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <FormErrors errors={ errors } />
            <form onSubmit={ (e) => this.submit(e, emailAddress, password) }>
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
                <button className="button button-secondary" onClick={(e) => {this.props.history.push("/")}}>Cancel</button>
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