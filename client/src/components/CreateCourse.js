import React from 'react';

class CreateCourse extends React.Component {

  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: ""
  }

  handleTitleValueChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleDescriptionValueChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleEstimatedTimeValueChange = (e) => {
    this.setState({ estimatedTime: e.target.value });
  }

  handleMaterialsNeededValueChange = (e) => {
    this.setState({ materialsNeeded: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const { context } = this.props;

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: 4
    };

    context.actions.postCourse(body)
      .then(data => data)
      .catch(err => console.log(err));
  } 

  render(){
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    return(
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    onChange={(e) => this.handleTitleValueChange(e)} value={ title } />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className="" placeholder="Course description..."
                    onChange={(e) => this.handleDescriptionValueChange(e)} value={ description } />
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
                        onChange={(e) => this.handleEstimatedTimeValueChange(e)} placeholder="Hours" value={ estimatedTime } />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."
                        onChange={(e) => this.handleMaterialsNeededValueChange(e)} value={ materialsNeeded } />
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