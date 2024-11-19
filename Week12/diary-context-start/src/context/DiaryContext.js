import React, {createContext} from 'react'

// Create the context for data sharing
const DiaryContext = createContext()

// Create a Provider component which can wrap our App as children
export const DiaryProvider = ({children}) => {
  const diaryPosts = [
    {title: 'Diary Post #1'},
    {title: 'Diary Post #2'},
    {title: 'Diary Post #3'},
    {title: 'Diary Post #4'},
  ]
  return (
    <DiaryContext.Provider value={{posts: diaryPosts}}>
      {children}
    </DiaryContext.Provider>
  )
}

export default DiaryContext
