import React, {Component} from 'react';

export const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: null
  }

  // access api and handles all calls
  api = async (url, method, body) => {
    return fetch(url, {
      method: method, 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: body 
    });
  }

  getUser = async () => {
    await this.api("http://localhost:5000/api/users", 'GET', null)
      .then(data => {return data.json()})
      .catch(err => {return err});
  } 

  postUser = async () => {

  } 

  getCourses = async () => {
    await this.api("http://localhost:5000/api/courses", 'GET', null)
      .then(data => {console.log(data.json())})
      .catch(err => {return err});
  }

  postCourse = async () => {

  }

  putCourse = async () => {

  } 

  deleteCourse = async () => {

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