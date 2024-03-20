import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UserProfile from '../UserProfile'
import EmploymentFilter from '../EmploymentFilter'
import SalaryFilter from '../SalaryFilter'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const activeApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentType: '',
    minimumPackage: '',
    searchValue: '',
    apiStatus: activeApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobList()
  }

  onSuccessfulResponse = jobsList => {
    this.setState({
      jobsList,
      apiStatus:
        jobsList.length !== 0
          ? activeApiStatusConstants.success
          : activeApiStatusConstants.noJobs,
    })
  }

  onFailureResponse = () => {
    this.setState({apiStatus: activeApiStatusConstants.failure})
  }

  getJobList = async () => {
    this.setState({apiStatus: activeApiStatusConstants.loading})
    const {employmentType, minimumPackage, searchValue} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchValue}`

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedJobsList = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.onSuccessfulResponse(updatedJobsList)
    } else {
      this.onFailureResponse()
    }
  }

  onFilterEmploymentType = id => {
    const {employmentType} = this.state

    if (employmentType === '') {
      this.setState({employmentType: id}, this.getJobList)
    } else {
      const splittedEmploymentType = employmentType.split(',')

      const isAlreadyInList = splittedEmploymentType.includes(id)

      if (isAlreadyInList) {
        const filteredEmplymentType = splittedEmploymentType.filter(
          eachItem => eachItem !== id,
        )
        const updatedEmplymentType = filteredEmplymentType.join(',')
        this.setState({employmentType: updatedEmplymentType}, this.getJobList)
      } else {
        splittedEmploymentType.push(id)
        const updatedEmplymentType = splittedEmploymentType.join(',')
        this.setState({employmentType: updatedEmplymentType}, this.getJobList)
      }
    }
  }

  onFilterSalaryRange = id => {
    this.setState({minimumPackage: id}, this.getJobList)
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value.toLowerCase()})
  }

  onClickSearchBtn = () => {
    this.getJobList()
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-card-ul-cont">
        {jobsList.map(eachItem => (
          <JobCard jobCardDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
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
        <p className="no-job-h1">Oops! Something Went Wrong</p>
        <p className="no-job-p">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="retry-btn" type="button" onClick={this.getJobList}>
          Retry
        </button>
      </div>
    </div>
  )

  renderNoJobsView = () => (
    <div className="jobs-card-ul-cont">
      <div className="no-job-cont">
        <img
          className="no-job-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-job-h1">No Jobs Found</h1>
        <p className="no-job-p">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    </div>
  )

  render() {
    const {searchValue, apiStatus} = this.state

    const renderActiveView = () => {
      switch (apiStatus) {
        case activeApiStatusConstants.success:
          return this.renderSuccessView()
        case activeApiStatusConstants.loading:
          return this.renderLoadingView()
        case activeApiStatusConstants.failure:
          return this.renderFailureView()
        case activeApiStatusConstants.noJobs:
          return this.renderNoJobsView()
        default:
          return null
      }
    }

    return (
      <div className="jobs-bg-cont">
        <Header />
        <div className="jobs-cont">
          <div className="filters-cont">
            <div className="search-cont search-sm">
              <input
                value={searchValue}
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
              <button
                data-testid="searchButton"
                className="search-btn"
                type="button"
                onClick={this.onClickSearchBtn}
              >
                {1 === '1' && ''}
                <IoIosSearch className="search-icon" />
              </button>
            </div>
            <UserProfile />
            <hr />
            <h1 className="employment-filter-h1">Type of Employment</h1>
            <ul className="checkbox-filter-cont">
              {employmentTypesList.map(eachItem => (
                <EmploymentFilter
                  employmentTypeDetails={eachItem}
                  key={eachItem.employmentTypeId}
                  onFilterEmploymentType={this.onFilterEmploymentType}
                />
              ))}
            </ul>
            <hr />
            <h1 className="employment-filter-h1">Salary Range</h1>
            <ul className="checkbox-filter-cont">
              {salaryRangesList.map(eachItem => (
                <SalaryFilter
                  salaryRangeDetails={eachItem}
                  key={eachItem.salaryRangeId}
                  onFilterSalaryRange={this.onFilterSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-right-cont">
            <div className="jobs-result-cont">
              <div className="search-md">
                <div className="search-cont">
                  <input
                    value={searchValue}
                    className="search-input"
                    type="search"
                    placeholder="Search"
                    onChange={this.onChangeSearch}
                  />
                  <button
                    data-testid="searchButton"
                    className="search-btn"
                    type="button"
                    onClick={this.onClickSearchBtn}
                  >
                    {1 === '1' && ''}
                    <IoIosSearch className="search-icon" />
                  </button>
                </div>
              </div>

              {renderActiveView()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
