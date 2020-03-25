import React from 'react';

const FormErrors = ({ errors }) => {

  if (errors.length > 0) {
    return(
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            { errors.map( (err, i) => <li key={i}>{ err }</li>) }
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default FormErrors;