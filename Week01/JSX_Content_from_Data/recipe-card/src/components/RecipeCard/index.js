import Card from './Card.js'
import RecipeImg from './RecipeImg.js'
import RecipeInfo from './RecipeInfo.js'
import IngredientList from './IngredientList.js'
import InstructionList from './InstructionList.js'
// import RECIPE_IMG from '../../assets/pancake.png'
import {RECIPE} from './recipe-data.js'

export default function RecipeCard() {
  return (
    <Card>
      {/* RecipeImg */}
      <div>
        {/* <img src={RECIPE.imgSrc} alt="pancake" /> */}
        <RecipeImg imgSrc={RECIPE.imgSrc} altText={RECIPE.title} />
      </div>
      {/* layout div */}
      <div>
        {/* RecipeInfo */}
        <RecipeInfo title={RECIPE.title} description={RECIPE.description} />
      </div>
      <div>
        {/* IngredientsList */}
        <IngredientList ingredients={RECIPE.ingredients} />

        {/* InstructionsList */}
        <InstructionList instructions={RECIPE.instructions} />
      </div>
    </Card>
  )
}
