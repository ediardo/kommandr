import React, { Component } from 'react';

import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class FormSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
    this.props.handleOnChangeEmail(this.state.email);
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
    this.props.handleOnChangePassword(this.state.password);
  }

  onChangePasswordConfirm(e) {
    this.setState({ passwordConfirmation: e.target.value });
    //this.props.handleOnChangePasswordConfirm(passwordConfirmation);
  }

  render() {
    const { email, password, passwordConfirmation } = this.state;
    return (
      <FormGroup>
        <Label for="signupEmai">Email</Label>
        <Input type="email" name="signupEmai" id="signupEmai" value={email} onChange={this.onChangeEmail} />
        <Label for="signupPassword">Password</Label>
        <Input type="password" name="signupPassword" id="signupPassword" value={password} onChange={this.onChangePassword} />
        <Label for="signupPasswordConfirm">Confirm Password</Label>
        <Input type="password" name="signupPasswordConfirm" id="signupPasswordConfirm" value={passwordConfirmation} onChange={this.onChangePasswordConfirm} />
      </FormGroup>
    )
  }
}

export default FormSignUp;
