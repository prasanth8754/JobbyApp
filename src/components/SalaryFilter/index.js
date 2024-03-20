import './index.css'

const SalaryFilter = props => {
  const {salaryRangeDetails, onFilterSalaryRange} = props
  const {label, salaryRangeId} = salaryRangeDetails

  const filterSalaryRange = () => {
    onFilterSalaryRange(salaryRangeId)
  }

  return (
    <li className="checkbox-input-cont">
      <input
        id={salaryRangeId}
        className="checkbox-input"
        type="radio"
        name="salaryRange"
        onClick={filterSalaryRange}
      />
      <label className="checkbox-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryFilter
