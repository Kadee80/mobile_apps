// import react and reactdom libraries for use
import React from 'react'
import ReactDOM from 'react-dom/client'
// import our main parent app component
import App from './App'

// grab and store our root div element as a var
const root = ReactDOM.createRoot(document.getElementById('root'))
// use react dom to render our react project inside that div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
