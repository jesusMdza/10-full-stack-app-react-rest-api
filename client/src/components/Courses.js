import React from 'react';

class Courses extends React.Component {

  state = {
    courses: this.props.context.actions.getCourses()
  }

  render() {
    const { courses } = this.state;
    const { id, title } = this.state.courses;

    return(
      <div className="bounds">
        {/* { 
          courses ? 
          courses.map(course => {
            return <div className="grid-33">
              <a className="course--module course--link" href={`/courses/${id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
              </a>
            </div>         
          })
          : 
          null 
        } */}
        <a className="course--module course--add--module" href="create-course.html">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </a>
      </div>
    );
  }
}

export default Courses;