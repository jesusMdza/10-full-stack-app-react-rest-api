import React, {Component} from 'react';

export const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: null
  }

  // access api and handles all calls
  api = async (url, method, body = null) => {
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

    return fetch(url, options);
  }

  getUser = async () => {
    const response = await this.api("http://localhost:5000/api/users", 'GET', null);
    if (response.status === 200) {
      return response.json();
    } else {
      return response.status === 404;
    }
  } 

  postUser = async () => {
    const response = await this.api("http://localhost:5000/api/users", 'POST', null);
    if (response.status === 201) {
      return null;
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

  postCourse = async (body) => {
    const response = await this.api("http://localhost:5000/api/courses", 'POST', body);
    console.log(response);
    if (response.status === 201) {
      console.log('created');
      return null;
    } else {
      console.log('something went wrong');
      return response.status;
    }
  }

  putCourse = async () => {
    const response = await this.api("http://localhost:5000/api/courses", 'PUT', null);
    if (response.status === 204) {
      return null;
    } else {
      return response.status === 400;
    }
  }

  deleteCourse = async () => {
    const response = await this.api("http://localhost:5000/api/courses", 'DELETE', null);
    if (response.status === 204) {
      return null;
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
        deleteCourse: this.deleteCourse
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