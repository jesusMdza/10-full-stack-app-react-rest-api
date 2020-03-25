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

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }


  submit = async (e, body, confirmPassword) => {
    const { context } = this.props;
    const { password } = body;

    if (password !== confirmPassword) {
      e.preventDefault();
    } else {
      e.preventDefault();
      context.actions.postUser(body)
        .then(data => {
          if (data.error) {
            this.setState({ errors: data.error });
          }
        });
    }
  }

  render() {
    const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;
    const body = { firstName, lastName, emailAddress, password };

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <FormErrors errors={ errors } />
            <form onSubmit={ (e) => this.submit(e, body, confirmPassword) }>
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
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={(e) => { e.preventDefault(); this.props.history.push('/') }}>Cancel</button>
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