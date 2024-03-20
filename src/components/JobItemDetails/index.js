import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import SkillsItem from '../SkillsItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const activeApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobItemDetails: {}, apiStatus: activeApiStatusConstants.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  onSuccessfulResponse = jobItemDetails => {
    this.setState({jobItemDetails, apiStatus: activeApiStatusConstants.success})
  }

  onFailureResponse = () => {
    this.setState({apiStatus: activeApiStatusConstants.failure})
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: activeApiStatusConstants.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const updatedJobItemDetails = {jobDetails, similarJobs}

      this.onSuccessfulResponse(updatedJobItemDetails)
    } else {
      this.onFailureResponse()
    }
  }

  renderSuccessView = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, similarJobs} = jobItemDetails
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    const formatedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    const {description, imageUrl} = formatedLifeAtCompany

    return (
      <>
        <div className="job-card">
          <div className="company-logo-cont">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="comp-title-cont">
              <h1 className="comp-title">{title}</h1>
              <div className="rating-cont">
                <FaStar className="rating-icon" />
                <p className="comp-title rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-package-cont">
            <div className="location-cont-outside">
              <div className="location-cont">
                <MdLocationOn className="location-icon" />
                <p className="location-p">{location}</p>
              </div>

              <div className="location-cont">
                <BsBriefcaseFill className="location-icon" />
                <p className="location-p">{employmentType}</p>
              </div>
            </div>
            <p className="salary-p">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="comp-desc-cont">
            <div className="visit-link-cont">
              <h1 className="comp-desc-h1">Description</h1>
              <a
                target="__blank"
                href={companyWebsiteUrl}
                className="comp-website-link"
              >
                Visit
                <FaExternalLinkAlt className="visit-link-icon" />
              </a>
            </div>
            <p className="comp-desc-p">{jobDescription}</p>
          </div>
          <h1 className="comp-desc-h1 life-h1">Skills</h1>
          <ul className="skills-ul-cont">
            {skills.map(eachItem => (
              <SkillsItem skillsItemDetails={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1 className="comp-desc-h1 life-h1">Life at Company</h1>
          <div className="life-cont">
            <p className="comp-desc-p life-p">{description}</p>
            <img className="life-img" src={imageUrl} alt="life at company" />
          </div>
        </div>
        <div className="similar-job-cont">
          <h1 className="similar-h1">Similar Jobs</h1>
          <ul className="similar-ul-card-cont">
            {similarJobs.map(eachItem => (
              <SimilarJobItem
                similarJobItemDetails={eachItem}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-card-ul-cont">
      <div className="loader-container loader-cont" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-card-ul-cont">
      <div className="job-failure-cont no-job-cont">
        <img
          className="no-job-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="no-job-h1">Oops! Something Went Wrong</h1>
        <p className="no-job-p">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="retry-btn"
          type="button"
          onClick={this.getJobItemDetails}
        >
          Retry
        </button>
      </div>
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

    return (
      <div className="item-bg-cont">
        <Header />
        <div className="job-item-details-cont">{renderActiveView()}</div>
      </div>
    )
  }
}

export default JobItemDetails
