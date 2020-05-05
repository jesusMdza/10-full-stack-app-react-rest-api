import React from 'react';
import FormErrors from './FormErrors';

class UserSignIn extends React.Component {

  state = {
    emailAddress: "",
    password: "",
    errors: []
  }

  componentDidMount() {
    const { context, history } = this.props;
    if (context.authenticatedUser !== null) {
      history.push('/');
    }
  }

  // updates specific state property with user's input value
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
    const { from } = this.props.location.state || {from: { pathname: '/' }}; 

    context.actions.signIn(username, password)
      .then(user => {
        if (user === null) {
          e.persist(); // Keeps reference of synthetic event within an async callback
          this.setState({ errors: {error: ["Sign-in unsuccessful."]} });
        } else {
          e.persist();
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
          <h2 className="heading--signin">Sign In</h2>
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
                <div className="button-container">
                  <button className="button signin-button" type="submit">Sign In</button>
                </div>
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