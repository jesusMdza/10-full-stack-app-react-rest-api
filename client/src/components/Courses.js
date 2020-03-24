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
      });
  }

  // Returns list of courses
  returnCourses = () => {
    const { courses } = this.state;
    const courseData = courses.map(course => 
      <Course 
        key={course.id} 
        id={course.id} 
        title={course.title} />
    );

    return courseData;
  }

  render() {
    const { courses } = this.state;

    return(
      <div className="bounds">
        { 
          courses ? 
          this.returnCourses()
          : 
          null 
        }
        <div className="grid-33">
          <a className="course--module course--add--module" href="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course
            </h3>
          </a>
        </div>
      </div>
    );
  }
}