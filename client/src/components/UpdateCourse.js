import React from 'react';

class UpdateCourse extends React.Component {

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

  componentDidMount() {
    const { context, match } = this.props;
    context.actions.getCourses(match.params.id)
    .then(data => {
      if (data === null) {
        this.props.history.push("/notfound");
      } else {
        this.setState({
          title: data.title,
          description: data.description,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
          userId: data.userId
        });
      }
    })
    .catch(err => {
      this.props.history.push("/error");
    });
  }

  submit = (e) => {
    e.preventDefault();
    const { title, description, estimatedTime, materialsNeeded, userId } = this.state;
    const { context } = this.props;

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    if (context.authenticatedUser.id === userId) {
      context.actions.postCourse(body)
      .then(errors => {
        if (errors) {
          this.setState({ errors: errors.error });
        } else {
          context.actions.putCourse(body);
        }
      })
      .catch(err => this.props.history.push("/error"));
    } else {
      this.props.history.push("/forbidden");
    }
  } 

  render() {
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={ (e) => this.submit(e) }>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input 
                    id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={ title } onChange={ (e) => this.change(e) }
                  />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea 
                    id="description" name="description" className="" placeholder="Course description..." value={ description } onChange={ (e) => this.change(e) }>
                  </textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input 
                        id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={ estimatedTime } onChange={ (e) => this.change(e) }
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea 
                        id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." 
                        value={ materialsNeeded } onChange={ (e) => this.change(e) }>
                      </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push('/')}}>Cancel</button></div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCourse;