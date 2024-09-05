export default function RecipeImg(props) {
  // use destructuring to pull out ouir imgSrc prop as its own var
  const {imgSrc, altText} = props
  return <img src={imgSrc} alt={altText} />
}

// props = {
//   children: Some JSX element,
//   imgSrc: require(....),
//   alt: "some text"
// }
