import React from 'react';

const FormErrors = ({ errors }) => {

  const errArr = errors.error;

  if (errArr === undefined || errArr.length === 0) {
    return null;
  } else {
    return (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            { errArr.map( (err, i) => <li key={i}>{ err }</li>) }
          </ul>
        </div>
      </div>
    );
  }
}

export default FormErrors;