import createDataContext from './createDataContext'

// reducer is unique to each Context we generate
const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
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
        return post.id === action.payload.id ? action.payload : post
      })
    default:
      return state
  }
}

// action helpers, now bound with dispatch
const addDiaryPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({type: 'add_post', payload: {title, content}})
    if (callback) {
      callback()
    }
  }
}

const deleteDiaryPost = (dispatch) => {
  return (id) => {
    dispatch({type: 'delete_post', payload: id})
  }
}

const editDiaryPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({type: 'edit_post', payload: {id, title, content}})
    if (callback) {
      callback()
    }
  }
}

export const {Context, Provider} = createDataContext(
  postReducer,
  {
    addDiaryPost,
    deleteDiaryPost,
    editDiaryPost,
  },
  [
    {
      id: 123,
      title: 'Test Post 1',
      content:
        'test content so that we dont have to create a new post every time we reload!',
    },
  ]
)
