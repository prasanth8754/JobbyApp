import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isHavingError: false, errMsg: ''}

  onSuccessfulResponse = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({isHavingError: false})
    history.replace('/')
  }

  onFailureResponse = errMsg => {
    this.setState({isHavingError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    if (username !== '' || password !== '') {
      const userDetails = {
        username,
        password,
      }
      const url = 'https://apis.ccbp.in/login'

      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok === true) {
        this.onSuccessfulResponse(data.jwt_token)
      } else {
        this.onFailureResponse(data.error_msg)
      }
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isHavingError, errMsg} = this.state

    return (
      <div className="login-bg-cont">
        <form className="form-cont" onSubmit={this.onSubmitForm}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-cont">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              value={username}
              className="input"
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-cont">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              value={password}
              className="input"
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {isHavingError && <p className="login-err-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
