export default function IngredientList(props) {
  const {ingredients} = props
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>
        })}
      </ul>
    </div>
  )
}
