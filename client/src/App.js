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

// import higher order function
import withContext from './Context';

// components wrapped around imported higher order function
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

const App = () => {
  return (
    <div className="root">
      <div>
        <Router>
          <Header />

          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route exact path="/courses/create" component={CreateCourseWithContext} />
            <Route exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <Route exact path="/signin" component={UserSignIn} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
