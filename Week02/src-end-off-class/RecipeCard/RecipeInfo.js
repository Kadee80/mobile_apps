import React from 'react'
import './styles.css'

export default function RecipeInfo(props) {
  const {title, description} = props
  return (
    <div className="recipe_info">
      <h2 className="recipe_title">{title}</h2>
      <p>{description}</p>
    </div>
  )
}
