import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link className="route-link" to="/">
        <img
          className="navbar-web-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="nav-icons-cont-sm">
        <li>
          <Link className="route-link" to="/">
            <AiFillHome className="nav-icon" />
          </Link>
        </li>
        <li>
          <Link className="route-link" to="/jobs">
            <BsBriefcaseFill className="nav-icon" />
          </Link>
        </li>
        <li>
          <button className="logout-btn" type="button" onClick={onLogout}>
            {1 === '1' && ''}
            <FiLogOut className="nav-icon" />
          </button>
        </li>
      </ul>
      <div className="nav-link-cont-md">
        <ul className="nav-icons-cont-md">
          <li className="nav-links">
            <Link className="route-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-links">
            <Link className="route-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
      </div>

      <button className="logout-btn-md" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
