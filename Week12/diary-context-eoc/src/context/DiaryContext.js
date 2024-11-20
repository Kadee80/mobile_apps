import React, {createContext, useReducer} from 'react'

// Create the context for data sharing
const DiaryContext = createContext()

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      // copy our existing state array, and then append a new one at the end
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 10000),
          title: `Diary Post #${state.length + 1}`,
        },
      ]
    case 'delete_post':
      return state.filter((post) => post.id !== action.payload)
    default:
      return state
  }
}

// Create a Provider component which can wrap our App as children
export const DiaryProvider = ({children}) => {
  // always destructure out state and dispatch. remember state is ALL the state in one object usually
  // today our starting state is an empty array
  // dispatch is a helper function we call to dispatch action objects
  // actions = { type: 'add_post', payload?: data we need to update the state}

  // useReducer takes 2 arguments, the first is the reducer function we want to pass our actions into
  // the second is our initial state
  const [state, dispatch] = useReducer(postReducer, [])

  const addDiaryPost = () => {
    dispatch({type: 'add_post'})
  }

  const deleteDiaryPost = (id) => {
    dispatch({type: 'delete_post', payload: id})
  }

  return (
    <DiaryContext.Provider value={{data: state, addDiaryPost, deleteDiaryPost}}>
      {children}
    </DiaryContext.Provider>
  )
}

export default DiaryContext
