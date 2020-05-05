import React from 'react';
import FormErrors from './FormErrors';

class UserSignUp extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: []
  }

  // updates specific state property with user's input value
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  submit = async (e, body) => {
    const { context, history } = this.props;
    const { emailAddress, password, confirmPassword } = this.state;
    const { from } = this.props.location.state || {from: { pathname: '/' }}; 

    e.preventDefault();
    context.actions.postUser(body, password, confirmPassword)
      .then(errors => {
        e.persist();
        if (errors !== null) {
          this.setState({ errors: errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              history.push(from);
            })
        }
      })
      .catch(err => {
        this.props.history.push("/error");
      });;
  }

  render() {
    const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;
    const body = { firstName, lastName, emailAddress, password, confirmPassword };

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h2 className="heading--signup">Sign Up</h2>
          <div>
            <FormErrors errors={ errors } />
            <form onSubmit={ (e) => this.submit(e, body) }>
              <div>
                <input 
                  id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={ firstName }
                  onChange={ (e) => this.change(e) }
                />
              </div>
              <div>
                <input 
                  id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={ lastName }
                  onChange={ (e) => this.change(e) }
                />
              </div>
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
              <div>
                <input 
                  id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                  value={ confirmPassword } onChange={ (e) => this.change(e) }
                />
              </div>
              <div className="grid-100 pad-bottom">
                <div className="button-container">
                  <button className="button signup-button" type="submit">Sign Up</button>
                  <button className="button cancel-button" onClick={(e) => { e.preventDefault(); this.props.history.push('/') }}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>
    );
  }
}

export default UserSignUp;