import React from 'react';
import FormErrors from './FormErrors';

class CreateCourse extends React.Component {

  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
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

  submit = (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const { context } = this.props;

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: context.authenticatedUser.id
    };

    context.actions.postCourse(body)
    .then(data => {
      if (data.error) {
        e.persist();
        const error = {error: data.error};
        this.setState({ errors: error });
      } else if (data.course) {
        const courseId = data.course.id;
        this.props.history.push(`/courses/${ courseId }`);
      }
    })
    .catch(err => {
      this.props.history.push("/error");
    });
  }

  render(){
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;
    let capitalizedFirstName;
    let capitalizedLastName;

    if (context.authenticatedUser) {
      capitalizedFirstName = context.authenticatedUser.firstName.charAt(0).toUpperCase() + context.authenticatedUser.firstName.slice(1);
      capitalizedLastName = context.authenticatedUser.lastName.charAt(0).toUpperCase() + context.authenticatedUser.lastName.slice(1);
    }

    return(
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <FormErrors errors={ errors } />
          <form onSubmit={(e) => this.submit(e)}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    onChange={(e) => this.change(e)} value={ title } />
                </div>
                <p>By {`${capitalizedFirstName} ${capitalizedLastName}`}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className="" placeholder="Course description..."
                    onChange={(e) => this.change(e)} value={ description } />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        onChange={(e) => this.change(e)} placeholder="Hours" value={ estimatedTime } />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="Ex: * material 1"
                        onChange={(e) => this.change(e)} value={ materialsNeeded } />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push('/')}}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;