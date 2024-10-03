import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoContext from './context/Todos'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <TodoContext.Provider value={'hello context provider'}>
    <App />
  </TodoContext.Provider>
)
