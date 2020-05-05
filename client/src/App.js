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
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import DeleteCourse from './components/DeleteCourse';

// import higher order function
import withContext from './Context';

// components wrapped around imported higher order function
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const DeleteCourseWithContext = withContext(DeleteCourse);

const App = () => {
  return (
    <div className="root">
      <div>
        <Router>
          <HeaderWithContext />

          <Switch>
            <PrivateRoute exact path="/" component={CoursesWithContext} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute exact path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <PrivateRoute exact path="/courses/:id/delete" component={DeleteCourseWithContext} />
            <Route exact path="/signin" component={UserSignInWithContext} />
            <Route exact path="/signup" component={UserSignUpWithContext} />
            <Route exact path="/signout" component={UserSignOutWithContext} />
            <Route exact path="/error" component={UnhandledError} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
