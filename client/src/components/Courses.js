import React from 'react';
import Course from './Course';

export default class Courses extends React.Component {

  state = {
    courses: []
  }

  // calls "getCourses" from context
  // sets "courses" state to data received back
  componentDidMount() {
    const { context } = this.props;
    context.actions.getCourses()
      .then(data => {
        this.setState({courses: data});
      })
      .catch(err => {
        this.props.history.push("/error");
      });;
  }

  // Returns list of courses
  returnCourses = () => {
    const { context } = this.props;
    const { courses } = this.state;
    const courseData = courses.map(course => 
      <Course 
        key={course.id} 
        id={course.id} 
        title={course.title}
        description={course.description}
        owner={course.owner}
        firstName={course.owner.firstName}
        lastName={course.owner.lastName}
        context={context} />
    );

    return courseData;
  }

  render() {
    const { courses } = this.state;

    return(
      <div className="bounds">
        <div className="heading--section">
          <h1 className="main--heading">Courses</h1>
          <div>
            <a className="button create-button" href="/courses/create">
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="14" width="14" height="2" transform="rotate(-90 7 14)" fill="black"/>
                <rect x="0.5" y="6" width="14.5" height="2" fill="black"/>
              </svg>
              <span>Create Course</span>
            </a>
          </div>
        </div>
        <div className="course--grid">
          { 
            courses ? 
            this.returnCourses()
            : 
            null 
          }
        </div>
      </div>
    );
  }
}