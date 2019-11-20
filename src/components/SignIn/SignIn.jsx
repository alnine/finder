import React, { Component } from "react";
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { SignUpLink } from "../SignUp";

import * as ROUTES from '../../constants/routes';

const SignIn = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {email, password, error} = this.state;

    const isInvalid = password === '' || email === '';

    return(
      <form onSubmit={this.onSubmit}>
        <input name="email" value={email} type="text" onChange={this.onChange} placeholder="Email" />
        <input name="password" value={password} type="password" onChange={this.onChange} placeholder="Password" />
        <button disabled={isInvalid} type="submit">Sign In</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignIn;
export { SignInForm, SignIn };
