import React from 'react';

const Course = (props) => {
  const { id, title } = props;

  return(
    <div className="grid-33">
      <a className="course--module course--link" href={`/courses/${ id }`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{ title }</h3>
      </a>
    </div>  
  );
}

export default Course;