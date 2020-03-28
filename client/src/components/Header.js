import React from 'react';

const Header = (props) => {
  const { context } = props;

  return (
    <div className="header">
      <div className="bounds">
        <a href="/">
          <h1 className="header--logo">Courses</h1>
        </a>
        <nav>
          {
            context.authenticatedUser !== null ?
            <>
              <span>Welcome { context.authenticatedUser.firstName.charAt(0).toUpperCase() + context.authenticatedUser.firstName.slice(1) }!</span>
              <a className="signout" href="/signout">Sign Out</a>
            </>
            :
            <>
              <a className="signin" href="/signin">Sign In</a>
              <a className="signup" href="/signup">Sign Up</a>
            </>
          }
        </nav>
      </div>
    </div>
  );
}

export default Header;