import React, {Component} from 'react';
import Cookies from 'js-cookie';

export const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
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
      const encryptedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers["Authorization"] = `Basic ${encryptedCredentials}`;
    }

    return fetch(url, options);
  }

  signIn = async (username, password) => {
    const user = await this.getUser(username, password);
    if (user !== undefined) {
      this.setState({ authenticatedUser: user });

      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({authenticatedUser: null});
    Cookies.remove('authenticatedUser');
  }

  getUser = async (username, password) => {
    const response = await this.api("http://localhost:5000/api/users", 'GET', null, true, {username, password});
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
      return response.json();
    }
  }

  getCourses = async (id) => {
    let response;

    if (id) {
      response = await this.api(`http://localhost:5000/api/courses/${ id }`, 'GET', null);
    } else {
      response = await this.api("http://localhost:5000/api/courses", 'GET', null);
    }

    if (response.status === 200) {
      return response.json();
    } else {
      return response.status === 404;
    }
  }

  postCourse = async (body, username, password) => {
    const response = await this.api("http://localhost:5000/api/courses", 'POST', body, true, {username, password});
    console.log(response);
    if (response.status === 201) {
      return [];
    } else {
      console.log('something went wrong');
      return response.status;
    }
  }

  putCourse = async (username, password) => {
    const response = await this.api("http://localhost:5000/api/courses", 'PUT', null, true, {username, password});
    if (response.status === 204) {
      return null;
    } else {
      return response.status === 400;
    }
  }

  deleteCourse = async (id, username, password) => {
    const response = await this.api(`http://localhost:5000/api/courses/${ id }`, 'DELETE', null, true, {username, password});
    if (response.status === 204) {
      return response.status;
    } else {
      console.log(response.status);
      return response.status === 400;
    }
  } 

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
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