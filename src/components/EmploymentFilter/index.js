import './index.css'

const EmploymentFilter = props => {
  const {employmentTypeDetails, onFilterEmploymentType} = props
  const {label, employmentTypeId} = employmentTypeDetails

  const filterEmploymentType = () => {
    onFilterEmploymentType(employmentTypeId)
  }

  return (
    <li className="checkbox-input-cont">
      <input
        id={employmentTypeId}
        className="checkbox-input"
        type="checkbox"
        onClick={filterEmploymentType}
      />
      <label className="checkbox-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentFilter
