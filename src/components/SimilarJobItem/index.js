import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobItemDetails

  return (
    <li className="similar-job-card">
      <div className="company-logo-cont">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="comp-title-cont">
          <h1 className="comp-title">{title}</h1>
          <div className="rating-cont">
            <FaStar className="rating-icon" />
            <p className="comp-title rating">{rating}</p>
          </div>
        </div>
      </div>

      <div className="comp-desc-cont comp-desc-cont1">
        <h1 className="comp-desc-h1">Description</h1>
        <p className="comp-desc-p">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobItem
