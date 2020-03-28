import React, {Component} from 'react';
import Cookies from 'js-cookie';

export const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    password: Cookies.getJSON('password') || null
  }

  // access api and handles all calls
  api = async (url, method, body = null, requiresAuth = false, credentials = null) => {
    const options = {
      method: method, 
      mode: 'cors', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth === true) {
      const encryptedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers["Authorization"] = `Basic ${encryptedCredentials}`;
    }

    return fetch(url, options);
  }

  signIn = async (username, password) => {
    const user = await this.getUser(username, password);
    if (user !== undefined) {
      this.setState({ 
      authenticatedUser: {
        id: user.id,
        firstName: user.firstName,
        emailAddress: user.emailAddress,
        password: password
      },
      password: password
      }, () => {
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        Cookies.set('password', JSON.stringify(password), { expires: 1 });
      });
    }
    return user;
  }

  signOut = () => {
    this.setState({authenticatedUser: null});
    Cookies.remove('authenticatedUser');
  }

  getUser = async (emailAddress, password) => {
    const response = await this.api("http://localhost:5000/api/users", 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  } 

  postUser = async (body) => {
    const response = await this.api("http://localhost:5000/api/users", 'POST', body);
    if (response.status === 201) {
      return null;
    } else if (response.status === 400) {
      return response.status;
    }
  }

  getCourses = async (id) => {
    let response;

    if (id) {
      response = await this.api(`http://localhost:5000/api/courses/${ id }`, 'GET');
    } else {
      response = await this.api("http://localhost:5000/api/courses", 'GET');
    }

    if (response.status === 200) {
      return response.json();
    } else {
      return null;
    }
  }

  postCourse = async (body) => {
    const { authenticatedUser } = this.state;
    const { password } = this.state;
    const { emailAddress } = authenticatedUser;
    console.log(emailAddress, password);

    const response = await this.api("http://localhost:5000/api/courses", 'POST', body, true, { emailAddress, password });
    if (response.status === 201) {
      return null;
    } else if (response.status === 400) {
      return response.status;
    } else if (response.status === 401) {
      return response.status;
    }
  }

  putCourse = async (body) => {
    const { authenticatedUser } = this.state;
    const { password } = this.state;
    const { emailAddress } = authenticatedUser;

    const response = await this.api("http://localhost:5000/api/courses", 'PUT', body, true, { emailAddress, password });
    if (response.status === 204) {
      return response.json();
    } else {
      return response.status;
    }
  }

  deleteCourse = async (id) => {
    const { authenticatedUser } = this.state;
    const { password } = this.state;
    const { emailAddress } = authenticatedUser;

    const response = await this.api(`http://localhost:5000/api/courses/${ id }`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return response.status;
    } else {
      return response.status;
    }
  } 

  render() {
    const { authenticatedUser, password } = this.state;
    const value = {
      authenticatedUser,
      password,
      actions: {
        getUser: this.getUser,
        postUser: this.postUser,
        getCourses: this.getCourses,
        postCourse: this.postCourse,
        putCourse: this.putCourse,
        deleteCourse: this.deleteCourse,
        signIn: this.signIn,
        signOut: this.signOut
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}