export default function InstructionsList(props) {
  const {instructions} = props
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {instructions.map((instruction, index) => {
          return <li key={index}>{instruction}</li>
        })}
      </ul>
    </div>
  )
}
