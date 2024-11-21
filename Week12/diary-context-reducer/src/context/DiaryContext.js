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
          title: action.payload.title,
          content: action.payload.content,
        },
      ]
    case 'delete_post':
      return state.filter((post) => post.id !== action.payload)
    case 'edit_post':
      return state.map((post) => {
        // if the id matches the one we want to edit
        // return the new payload instead of the old post
        // if (post.id === action.payload.id) {
        //   return action.payload
        // } else {
        //   // otherwise, return the existing post untouched
        //   return post
        // }

        // ternary version
        return post.id === action.payload.id ? action.payload : post
      })
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
  const [state, dispatch] = useReducer(postReducer, [
    {
      id: 123,
      title: 'fake post 1',
      content: 'here is some content we dont have to type every time',
    },
  ])

  const addDiaryPost = (title, content, callback) => {
    dispatch({type: 'add_post', payload: {title, content}})
    if (callback) {
      callback()
    }
  }

  const deleteDiaryPost = (id) => {
    dispatch({type: 'delete_post', payload: id})
  }

  const editDiaryPost = (id, title, content, callback) => {
    dispatch({type: 'edit_post', payload: {id, title, content}})
    if (callback) {
      callback()
    }
  }

  return (
    <DiaryContext.Provider
      value={{state, addDiaryPost, deleteDiaryPost, editDiaryPost}}
    >
      {children}
    </DiaryContext.Provider>
  )
}

export default DiaryContext
