import React from 'react';
const ReactMarkdown = require('react-markdown');

export default class CourseDetail extends React.Component {

  state = {
    course: {},
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

  render(){
    const { context } = this.props;
    const { course } = this.state;
    const { id, title, description, estimatedTime, materialsNeeded, owner } = course;
 
    let capitalizedFirstName;
    let capitalizedLastName;
    let authUserId;
    let ownerId;

    if (context.authenticatedUser) {
      authUserId = context.authenticatedUser.id;
    }
    
    if (owner) {
      capitalizedFirstName = owner.firstName.charAt(0).toUpperCase() + owner.firstName.slice(1);
      capitalizedLastName = owner.lastName.charAt(0).toUpperCase() + owner.lastName.slice(1);
      ownerId = owner.id;
    }

    return(
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <div className="button-container">
              <a className="button back-button" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back</span>
              </a>
                {
                  authUserId && ownerId === authUserId ?
                    <>
                      <a className="button update-button" href={`/courses/${ id }/update`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span>Edit Course</span>
                      </a>
                      <a className="button delete-button" href={`/courses/${ id }/delete`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <span>Delete Course</span>
                      </a>  
                    </> 
                  :
                  null               
                }
            </div>
          </div>
        </div>
        <div className="grid--style">
          <div className="bounds course--detail view">
              <div className="grid-66">
                <div className="course--header">
                  <h1 className="main--heading--details">{ title }</h1>
                  <div className="course--author--container">
                    <p>By <span className="course--author">{ `${capitalizedFirstName} ${capitalizedLastName}` }</span></p>
                  </div>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={ description } />
                </div>
              </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h2>Time</h2>
                    <span>{ estimatedTime }</span>
                  </li>
                  <li className="course--stats--list--item">
                    <h2>Materials Needed</h2>
                    <ul>
                      {
                        materialsNeeded ? 
                          <ReactMarkdown source={ materialsNeeded } renderers={{textarea: props => <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."
                          />}} /> 
                        :
                        null
                      }
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}