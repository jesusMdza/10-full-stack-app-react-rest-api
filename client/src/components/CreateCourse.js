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
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

    return(
      <div className="bounds course--detail">
        <h1 className="main--heading">Create Course</h1>
        <div>
          <FormErrors errors={ errors } />
          <form onSubmit={(e) => this.submit(e)}>
            <div className="grid-66">
              <div className="course--header">
                <h5 className="course--label">Title</h5>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Title..."
                    onChange={(e) => this.change(e)} value={ title } />
                </div>
              </div>
              <div className="course--description">
                <h5 className="course--label">Description</h5>
                <div>
                  <textarea id="description" name="description" className="" placeholder="Description..."
                    onChange={(e) => this.change(e)} value={ description } />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h5 className="course--label">Estimated Time</h5>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        onChange={(e) => this.change(e)} placeholder="Hours" value={ estimatedTime } />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h5 className="course--label">Materials Needed</h5>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="Ex: * material 1"
                        onChange={(e) => this.change(e)} value={ materialsNeeded } />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <div className="button-container">
                <button className="button create-button" type="submit">Create Course</button>
                <button className="button cancel-button" onClick={(e) => {e.preventDefault(); this.props.history.push('/')}}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;