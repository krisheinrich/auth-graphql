import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser'
import mutation from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons() {
    const { user, loading } = this.props.data;

    if (loading) return <div />;
    // check for this.props.data.user (i.e. if user is authenticated)
    if (!user) {
      return ([
        <li key="signup">
          <Link to="/signup">Sign Up</Link>
        </li>,
        <li key="login">
          <Link to="/login">Login</Link>
        </li>
      ]);
    } else {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Home</Link>
          <ul className="right">
            { this.renderButtons() }
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
