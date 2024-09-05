function App() {
  const message = 'Hello React'

  const myObj = {
    name: 'katie',
    age: 39,
  }

  return (
    // adjacent element but always be wrapped in ONE parent tag
    <>
      <h1>{message}</h1>
      <p>
        Hi my name is {myObj.name} and i am {myObj.age}
      </p>
    </>
  )
}

export default App
