import './index.css'

const SkillsItem = props => {
  const {skillsItemDetails} = props
  const formatedSkillItem = {
    imageUrl: skillsItemDetails.image_url,
    name: skillsItemDetails.name,
  }
  const {name, imageUrl} = formatedSkillItem

  return (
    <li className="skill-item-cont">
      <img className="skill-img" src={imageUrl} alt={name} />
      <p className="skill-p">{name}</p>
    </li>
  )
}

export default SkillsItem
