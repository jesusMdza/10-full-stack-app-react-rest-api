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
    .then(errors => {
      console.log(errors);
      if (errors) {
        e.persist();
        this.setState({ errors: errors.error });
      } else {
        return null;
      }
    })
    .catch(err => console.log(err));
  }

  render(){
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

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
                <p>By Joe Smith</p>
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
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."
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