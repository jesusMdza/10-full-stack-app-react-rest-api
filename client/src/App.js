import React from 'react';
import './styles/global.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import external components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

// import higher order function
import withContext from './Context';

// components wrapped around imported higher order function
const CoursesWithContext = withContext(Courses);

const App = () => {
  return (
    <div className="root">
      <div>
        <Router>
          <Header />

          <Switch>
            <Route path="/" component={CoursesWithContext} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signout" component={UserSignOut} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
