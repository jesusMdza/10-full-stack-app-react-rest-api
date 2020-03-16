import React from 'react';

export default class CourseDetail extends React.Component {

  state = {
    course: {}
  }

  componentDidMount() {
    const { context, match } = this.props;
    context.actions.getCourses(match.params.id)
    .then(data => {
      this.setState({course: data});
    });
  }

  render(){
    const { course } = this.state;
    const { title, description, estimatedTime, materialsNeeded } = course;

    return(
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              <a className="button" href="/">Update Course</a>
              <a className="button" href="/">Delete Course</a>
            </span>
            <a className="button button-secondary" href="/">Return to List</a>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{ title }</h3>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <p>{ description }</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{ estimatedTime }</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {materialsNeeded ? <li>{ materialsNeeded }</li> : null}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}