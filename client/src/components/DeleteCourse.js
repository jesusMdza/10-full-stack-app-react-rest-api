import React from 'react';

class DeleteCourse extends React.Component {

  state = {
    course: {}
  }

  // retrieves course data by id parameter
  componentDidMount() {
    const { context, match } = this.props;

    context.actions.getCourses(match.params.id)
    .then(data => {
      if (data === null) {
        this.props.history.push("/notfound");
      } else {
        this.setState({
          course: data
        });
      }
    })
    .catch(err => {
      this.props.history.push("/error");
    }); 
  }

  // Delete's course if authenticated user owns course
  isOwnerDeleteCourse = (id) => {
    const { context } = this.props;
    const { course } = this.state;
    const { owner } = course;

    if (owner.id === context.authenticatedUser.id) {
      context.actions.deleteCourse(id)
        .then(data => this.props.history.push("/"))
        .catch(err => {
          this.props.history.push("/error");
        });
    } else {
      this.props.history.push("/forbidden");
    }
  }

  render() {
    const { course } = this.state;
    const { id, title } =  course;

    return(
      <div className="bounds">
        <div className="message--container message--delete">
          <div className="message--text">
            <h1>Are you sure you want to delete course:</h1>
            <h1>{ title }</h1>
            <div className="button-container delete">
              <button className="button delete-button" onClick={ () => this.isOwnerDeleteCourse( id )}>
                <span>Delete Course</span>
              </button>  
              <button className="button cancel-button" onClick={(e) => {e.preventDefault(); this.props.history.push(`/courses/${ id }`)}}>Cancel</button>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default DeleteCourse;