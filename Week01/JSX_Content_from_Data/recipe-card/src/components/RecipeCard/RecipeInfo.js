export default function RecipeInfo(props) {
  // if you want to destructure, the object key will be the variable name
  const {title, description} = props
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
