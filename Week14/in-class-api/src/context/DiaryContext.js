import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

// reducer is unique to each Context we generate
const postReducer = (state, action) => {
  switch (action.type) {
    case 'get_posts':
      // our DB is the single source of truth for our total posts
      // because of that, we do not copy and update any existing state
      return action.payload
    // case 'add_post':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 10000),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ]
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

const getDiaryPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('posts')
    // response.data is where our array of posts will be
    dispatch({type: 'get_posts', payload: response.data})
  }
}

// action helpers, now bound with dispatch
const addDiaryPost = (dispatch) => {
  return async (title, content, callback) => {
    const response = await jsonServer.post('/posts', {title, content})
    // dispatch({type: 'add_post', payload: {title, content}})
    if (callback) {
      callback()
    }
  }
}

const deleteDiaryPost = (dispatch) => {
  return async (id) => {
    const response = await jsonServer.delete(`/posts/${id}`)
    dispatch({type: 'delete_post', payload: id})
  }
}

const editDiaryPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/posts/${id}`, {title, content})

    dispatch({type: 'edit_post', payload: {id, title, content}})
    if (callback) {
      callback()
    }
  }
}

export const {Context, Provider} = createDataContext(
  postReducer,
  {
    getDiaryPosts,
    addDiaryPost,
    deleteDiaryPost,
    editDiaryPost,
  },
  []
)
