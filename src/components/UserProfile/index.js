import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const activeApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userProfile: {}, apiStatus: activeApiStatusConstants.initial}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({apiStatus: activeApiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedUserProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userProfile: updatedUserProfile,
        apiStatus: activeApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: activeApiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {userProfile} = this.state
    const {name, profileImageUrl, shortBio} = userProfile
    return (
      <div className="profile-cont">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-designation">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="retry-btn-cont">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="retry-btn-cont">
      <button className="retry-btn" type="button" onClick={this.getUserProfile}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    const renderActiveView = () => {
      switch (apiStatus) {
        case activeApiStatusConstants.success:
          return this.renderSuccessView()
        case activeApiStatusConstants.loading:
          return this.renderLoadingView()
        case activeApiStatusConstants.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    return <>{renderActiveView()}</>
  }
}

export default UserProfile
