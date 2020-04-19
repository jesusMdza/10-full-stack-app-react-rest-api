import React from 'react';
import FormErrors from './FormErrors';

class UpdateCourse extends React.Component {

  state = {
    id: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    errors: [],
    owner: ""
  }

  // updates specific state property with user's input value
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  // returns true if authorized (signed in) user owns the current course selected
  isOwner = (data, context) => {
    if (data.owner.id === context.authenticatedUser.id) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    const { context, match } = this.props;
    const { id } = match.params;

    context.actions.getCourses(id)
    .then(data => {
      if (data === null) {
        this.props.history.push("/notfound");
      } else {
        let isOwner = this.isOwner( data, context );
        
        // if true, set data properties to state
        // else, display "forbidden" page to user
        if (isOwner) {
          this.setState({
            id: data.id,
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
            userId: data.userId,
            owner: data.owner
          });
        } else {
          this.props.history.push("/forbidden");
        }
      }
    })
    .catch(err => {
      this.props.history.push("/error");
    });
  }

  submit = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { id, title, description, estimatedTime, materialsNeeded, userId } = this.state;

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    context.actions.putCourse(id, body)
    .then(error => {
      if (error) {
        e.persist();
        this.setState({ errors: error });
      } else {
        this.props.history.push(`/courses/${ id }`);
      }
    })
    .catch(err => this.props.history.push("/error"));
  } 


  render() {
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

    return(
      <div className="bounds course--detail">
        <h1>Edit Course</h1>
        <div>
          <FormErrors errors={ errors } />
          <form onSubmit={ (e) => this.submit(e) }>
            <div className="grid-66">
              <div className="course--header">
                <h5 className="course--label">Title</h5>
                <div>
                  <input 
                    id="title" name="title" type="text" className="input-title course--title--input" placeholder="Title..."
                    value={ title } onChange={ (e) => this.change(e) }
                  />
                </div>
              </div>
              <div className="course--description">
                <h5 className="course--label">Description</h5>
                <div>
                  <textarea 
                    id="description" name="description" className="" placeholder="Description..." value={ description } onChange={ (e) => this.change(e) }>
                  </textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h5 className="course--label">Time</h5>
                    <div>
                      <input 
                        id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={ estimatedTime } onChange={ (e) => this.change(e) }
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h5 className="course--label">Materials Needed</h5>
                    <div>
                      <textarea 
                        id="materialsNeeded" name="materialsNeeded" className="" placeholder="Ex: * material 1"
                        value={ materialsNeeded } onChange={ (e) => this.change(e) }>
                      </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button save-button" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Save</span>
              </button>
              <button className="button cancel-button" onClick={(e) => {e.preventDefault(); this.props.history.push('/')}}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCourse;