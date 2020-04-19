import React from 'react';

const Course = (props) => {
  const { id, title, description, owner, firstName, lastName, context } = props;
  let capitalizedFirstName;
  let capitalizedLastName;
  let authUserId;
  let ownerId;

  if (context.authenticatedUser) {
    authUserId = context.authenticatedUser.id;
  }
  
  if (owner) {
    capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    ownerId = owner.id;
  }

  return(
    <div className="grid-33">
            {
              authUserId && ownerId === authUserId ?
              <a className="course--module course--link course--editable" href={`/courses/${ id }`}>
                <h2 className="course--title">{ title }</h2>
                <h4 className="course--description">{ description }</h4>
                <div className="course--extras">
                  <h5 className="course--author--card">{`${capitalizedFirstName} ${capitalizedLastName}`}</h5>
                  <div className="course--option course--option--editable">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <h5>Editable</h5>
                  </div>
                </div>
              </a>
              :
              <a className="course--module course--link" href={`/courses/${ id }`}>
                <h2 className="course--title">{ title }</h2>
                <h4 className="course--description">{ description }</h4>
                <div className="course--extras">
                  <h5 className="course--author--card">{`${capitalizedFirstName} ${capitalizedLastName}`}</h5>
                  <div className="course--option course--option--view">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#979797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin ="round" className="feather feather-eye">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <h5>View Only</h5>
                  </div>
                </div>
              </a>
            }
    </div>  
  );
}

export default Course;