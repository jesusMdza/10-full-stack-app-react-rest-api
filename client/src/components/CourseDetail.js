import React from 'react';

export default class CourseDetail extends React.Component {

  state = {
    course: {},
  }

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
  
  isOwner = (path) => {
    const { context } = this.props;
    const { course } = this.state;
    const { owner } = course;

    if (owner.id === context.authenticatedUser.id) {
      this.props.history.push( path );
    } else {
      this.props.history.push( "/forbidden" );
    }
  }

  render(){
    const { course } = this.state;
    const { id, title, description, estimatedTime, materialsNeeded, owner } = course;

    let capitalizedFirstName;
    let capitalizedLastName;
    
    if (owner) {
      capitalizedFirstName = owner.firstName.charAt(0).toUpperCase() + owner.firstName.slice(1);
      capitalizedLastName = owner.lastName.charAt(0).toUpperCase() + owner.lastName.slice(1);
    }

    return(
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              <button className="button" onClick={ () => this.isOwner(`/courses/${ id }/update`) }>Update Course</button>
              <button className="button" onClick={ () => this.isOwner(`/courses/${ id }/delete`) }>Delete Course</button>
            </span>
            <a className="button button-secondary" href="/">Return to List</a>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{ title }</h3>
              <p>By { `${capitalizedFirstName} ${capitalizedLastName}` }</p>
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