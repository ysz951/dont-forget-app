import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import './LoginForm.css';
export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };
  state = { error: null };

  handleSubmitBasicAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  };

  render() {
    const {error} = this.state;
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitBasicAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <input
            className="user_name"
            name='user_name'
            id='LoginForm__user_name'
            placeholder="test"
            required
          />
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <input
            className="password"
            name='password'
            type='password'
            id='LoginForm__password'
            placeholder="password"
            required
          />
        </div>
        <button className="LoginFrom_submit_btn btn_type_1" type='submit'>
          Login
        </button>
      </form>
    );
  }
}
