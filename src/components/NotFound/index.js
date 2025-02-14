import './index.css'

const NotFound = () => (
  <div className="not-found-bg-cont">
    <div className="not-found-cont">
      <img
        className="not-found-img"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-h1">Page Not Found</h1>
      <p className="not-found-p">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
