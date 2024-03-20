import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`} className="route-link">
      <li className="job-card">
        <div className="company-logo-cont">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="comp-desc-h1">Description</h1>
          <p className="comp-desc-p">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
