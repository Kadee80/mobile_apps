# CRUD App Continued

Last class, we ended with adding the Delete Icon and wiring up `deleteDiaryPost` to our `reducer` in `Context`. Today we will continue with our app, and hold off on the 'clever' refactor until the end, just so that you have 2 examples of the final code. The first version may seem easier to follow for your Final edits.

## More Screens Means Navigation!

Since we can delete on Icon tap, we should also be able to navigate to the `ViewPost` screen. This screen will render an individual diary post. Right now, we do not have any details besides the id and title to render, but that will change once we create our `CreateScreen` and `EditScreen` screens.

To begin, create a new file inside `screens/` named `ViewScreen.js`. Type `rnfes + enter` to generate the usual boilerplate component code. Next, impoprt the new screen in `App.js` and add it to the route `View`. Next up is use the `navigation` prop in `IndexScreen` to navigate to `ViewScreen` when a post's title is clicked. We will do this by wrapping our parent `View` in another `TouchableOpacity`.

```jsx
const IndexScreen = (props) => {
  const {state, addDiaryPost, deleteDiaryPost} = useContext(Context)
  const {navigaton} = props
  return (
    <View>
      <Button title="Add Post" onPress={addDiaryPost} />
      <FlatList
        data={state}
        keyExtractor={(post) => post.title}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigaton.navigate('View')}>
            <View style={styles.row}>
              <Text style={styles.title}>
                {item.title}-{item.id}
              </Text>
              <TouchableOpacity onPress={() => deleteDiaryPost(item.id)}>
                <MaterialIcons name="delete" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
```

This is great to get us to see the `ViewScreen`, but we will need an `id` via the second argument to pass into this screen in order to render the post that was clicked.

```jsx
<TouchableOpacity
  onPress={() => navigaton.navigate('View', {id: item.id})}
>
```

Next up, we need to retrieve that `id` in the `ViewScreen`:

```jsx
const ViewScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  ...
}
```

Now that we have the `id` we need to reach up into `Context` to select the post with that `id`. Remember, whenever a component needs direct access to Context we need to import `useContext` and `DiaryContext` at the top of our file. Once we do that we can use `useContext(DiaryContext)` to destructure out `data` aka `state`. To avoid confusion further down the line, let's go ahead and change `data` back to `state` in the following files:

- DiaryContext: change `data: state` inside our `value` prop to simply `state`.
- IndexScreen: change `data` to state in the props destructure and inside its usage in `FlatList`.

Now that that small refactor is complete, we can render out the `id` instead of the words 'View Screen' within our text element. We have access to `Context` now, so we can use the `find()` function to select the appropriate post. Find works similarly to `filter` where you pass it a function and it will find the item that it returns truthy.

```jsx
const post = state.find((diaryPost) => diaryPost.id === id)
```

We can now use `post` to render out anything we need. For now, all we have is a `title` so we can replace the value of our Text element with that.

```jsx
<Text>{post.title}</Text>
```

That's it for now for the `ViewScreen` until we are creating posts with more properties. Time to move on to the `CreateScreen`.

## Navigating to the Create Screen

First things first, we need some content and a custom title in our posts. Time to work on the `CreateScreen`. The `CreateScreen` will be accessed by a [+] button in the header of our `IndexScreen`. To begin, add a `CreateScreen.js` to the `screens/` directory, add the usual boilerplate component and wire it up to the stack navigator. When you add the screen boilerplate, feel free to add in an import for `useContext` and `DiaryContext` since we will be needing it shortly.

Before we start working on the `CreateScreen`, we need a way of accessing it. Since we want to add a `+` icon within the header, it is a little bit more complicated. Let's tackle that first. Open up your `IndexScreen` and scroll down past the end of your component function. Here is where we will add custom `navigationOptions`. I chose a `MaterialDesign` icon for the trash/delete icon so I have already imported the MaterialDesign icon library in this file. Make sure you import the proper library for the icon you choose for +. This can easily be found by clicking on the icon you wish to import/use for a code sample.

```jsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

...

IndexScreen.navigationOptions = () => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <MaterialIcons name="add" size={30} color="black" />
      </TouchableOpacity>
    ),
  }
}
```

When you reload your app, you should see a `+` icon on the right hand side of the header. It's a little close to the side of the screen, so we might as well add a style to it so that we can add some `marginRight` right away.

Now we need to wrap our header icon in a `TouchableOpacity` that navigates the user to the `CreateScreen`. Lucky for us, we also get the same props inside our `navigationOptions`. You may have to reload your app again before the navigation gets picked up.

```jsx
IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <MaterialIcons
          name="add"
          size={30}
          color="black"
          style={styles.addIcon}
        />
      </TouchableOpacity>
    ),
  }
}
```

## CreateScreen Form

We now need to add some Text labels and TextInputs to our `CreateScreen`. Don't forget to import the `TextInput` Primitive up top.

```jsx
<View>
  <Text>Title: </Text>
  <TextInput />

  <Text>Content: </Text>
  <TextInput />
</View>
```

Remember, whenever you use a `TextInput` it needs to be bound to a piece of state. Even though we have our global Context state, we can still make use of local state within our files. Those local state values can be passed up to our reducer via `action.payload` down the line. This should all be review so we will skip to the binding code below.

```jsx
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
return (
  <View>
    <Text>Title: </Text>
    <TextInput value={title} onChangeText={(text) => setTitle(text)} />

    <Text>Content: </Text>
    <TextInput value={content} onChangeText={(text) => setContent(text)} />
  </View>
)
```

We have not added any styling to our inputs yet, so they are almost invisble, but if your code is correct, you should be able to type into both inputs successfully. Even though the styling is up to you for your final, we should probably make sure the inputs are a little more obvious before moving on.

```jsx
const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    margin: 10,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 5,
    borderRadius: 5,
  },
})
```

Finally, we need to add in a Button to submit the form. The goal is `onPress`, the values from the create form are used to add a new post, and the user is redirected back to the `IndexScreen`.

Step 1 is to open up `DiaryContext` and modify the `addDiaryPost` function to utilize the `action.payload` to create a new post instead of the hardcoded 'smart' title generation. All of that tedium setting up Context and our reducer will pay off now!

```jsx
case 'add_post':
  return [
    ...state,
    {
      id: Math.floor(Math.random() * 10000),
      title: action.payload.title,
      content: action.payload.content,
    },
  ]

  ...

  const addDiaryPost = (title, content) => {
    dispatch({type: 'add_post', payload: {title, content}})
  }
```

At this point, the big Add Post Button on the `IndexScreen` will stop working, so we should remove it in favor of using the `CreateScreen`.
In our `CreateScreen` we can destructure off the `addDiaryPost` function and then call it `onPress` using our local state's `title` and `content`.

```jsx
...

const {addDiaryPost} = useContext(DiaryContext)

...

<Button title="Add Post" onPress={() => addDiaryPost(title, content)} />

...
```

We can check to see if our post was successfully created by manually navigating back to the `IndexScreen`. Also, while I was testing this out, iI accidentally generated 2 posts with the same `title`. This breaks our unique key rule inside our `FlatList`. Since we now are generating a random unique `id` we can use that instead of `title` inside of our `keyGenerator` function. Regardles, that mistake was discovered because I the user was not aware that I had successfully generated a post until I pressed the back button within the header. So a much better UX would be automatic redirection to that page.

As you can imagine, we could easily add in another line of code to our submit buttons `onPress` handler. There is a better, slightly more complicated way to do this.

Easier, but less good. Why? What if in the future, we wanted to submit the form to an external API? That would be async and take a few milliseconds to complete and could cause errors:

```jsx
<Button
  title="Add Post"
  onPress={() => {
    addDiaryPost(title, content)
    navigation.navigate('Index')
  }}
/>
```

Better! Pass our navigate function as a callback to our action itself:

Button Code

```jsx
<Button
  title="Add Post"
  onPress={() => {
    addDiaryPost(title, content, () => {
      navigation.navigate('Index')
    })
  }}
/>
```

Action Code (DiaryContext):

```jsx
const addDiaryPost = (title, content, callback) => {
  dispatch({type: 'add_post', payload: {title, content}})
  callback()
}
```

## EditScreen

We are up to our final screen! First, we need to add a clickable Icon to the `headerRight` that navigates to it on the `ViewScreen`. Create the `EditScreen` and add the usual boilerplate, and add the new screen to your routes inside `App.js`. We just added an Icon that navigates on our IndexScreen. This should be review.

Now we are navigating to our `EditScreen` but we need to prepopulate our inputs with the `title` and `content` from the post we were viewing on `ViewScreen`. We already know how to do this too! Before we add in the form, take a moment to pass these params and print them out on our newly created `EditScreen`. Hint: all you need to pass is the `id` and use the `find()` function to select the correct post from Context.

OK, now that we know we are getting all of the neccessary data into our `EditScreen` it's time to use them to initialize some local state values, and prepopulate our form with them. Remember, when we call `useState` we can set the initial state!

```jsx
  const id = navigation.getParam('id')
  const {state} = useContext(DiaryContext)
  const post = state.find((diaryPost) => diaryPost.id === id)

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  ...

  // You can copy paste the JSX from CreateScreen. Change the Button title and remove the onPress function for now. Since we just copied and pasted identical JSX, it's time for a reusable component!

```

### Making a Reusable Form Component

Like it said in the code comment above, whenever we have identical JSX in more than one place, we should probably create a reusable component. Inside the empty `components/` directory. Make a new file named `PostForm.js`. Add the usual boilerplate but don't worry about the returned JSX. We will be copying and pasting in just a second!

Before we start adding some JSX in. Let's take a moment to think about the `props` we might need. We know we will need:

- onSubmit function = 'add_post' || 'edit_post'
- initialFormValues = '' or 'post.title, post.content'
- Button text = 'Create' || 'Save'

1. Copy and Paste all of the JSX from `CreateScreen`. Paste it in to the `PostForm`.
2. Save yourself even more time by copying/pasting the styles as well.
3. Import the missing Primitives: `Button` and `TextInput`.
4. Copy and Paste the 2 state variables `title` and `content`.
5. Import `{useState}` at the top of your file.
6. Remove everything inside the `onPress` handler inside the `Button`.
7. Change the `Button` title to 'Save Post' to make it super generic. You can update this with a prop later if you wish.
8. Now it's time to replace the JSX inside `CreateScreen` and `EditScreen` with our new component. After this we can worry about customization via `props`.
9. Clean up the now unused imports at the top of these files.

Now its time to customize each instance of `PostForm` with props, starting with the `CreateScreen`.

1. We know we will need to call an `onSubmit` function, so let's name that prop `onSubmit`. We no longer have `title` and `content` within the same file, so we will need to pass them into the wrapping function.

CreateScreen:

```jsx
const CreateScreen = ({navigation}) => {
  const {addDiaryPost} = useContext(DiaryContext)

  return (
    <PostForm
      onSubmit={(title, content) => {
        addDiaryPost(title, content, () => navigation.navigate('Index'))
      }}
    />
  )
}
```

PostForm:

```jsx
const PostForm = (props) => {
  const {onSubmit} = props
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <View>
      <Text style={styles.label}>Title: </Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Content: </Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Add Post" onPress={() => onSubmit(title, content)} />
    </View>
  )
}
```

At this point, we can test our `CreateScreen` to make sure it works as expected. Now we can do the same process with `EditScreen`. Remember, we need to pass in some initial values for `title` and `content` here. Also, we have not yet added our `editDiaryPost` code to our Context file yet!

There is one tricky thing here. `initialValues` is only passed in as a prop on the `EditScreen`. We need to sneak in some default prop values. The code below is future proofed to anticipate the sunsetting of `defaultProps`.

EditScreen:

```jsx
const EditScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const {state} = useContext(DiaryContext)
  const post = state.find((diaryPost) => diaryPost.id === id)

  return (
    <PostForm
      initialValues={{title: post.title, content: post.content}}
      onSubmit={(title, content) => {
        console.log(title, content)
      }}
    />
  )
}
```

Updated PostForm with default prop values:

```jsx
const PostForm = (props) => {
  // remember, we only get initialValues from the EditScreen
  // these are optional props so we need a fallback if they are undefined to avoid errors
  const {initialValues = {title: '', content: ''}, onSubmit} = props

  const [title, setTitle] = useState(initialValues.title)
  const [content, setContent] = useState(initialValues.content)
  return (
    <View>
      <Text style={styles.label}>Title: </Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Content: </Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Add Post" onPress={() => onSubmit(title, content)} />
    </View>
  )
}
```

This is much cleaner. Finally, we have one last action to create and wire up: `'edit_post'`.

## Edit Post Action

Open up `DiaryContext.js`. It's time to add our final action function, reducer case, and wire it up to `EditScreen`'s `onSubmit` function.

First, scroll down to your action functions and add a new one named `editDiaryPost`. This is be similar to our updated `addDiaryPost` code, but remember we will need the `id` as well so we know which post to update:

```jsx
const editDiaryPost = (id, title, content) => {
  dispatch({
    type: 'edit_post',
    payload: {id, title, content},
  })
}
// dont forget to pass editDiaryPost into your value prop below1
return (
  <DiaryContext.Provider
    value={{state, addDiaryPost, deleteDiaryPost, editDiaryPost}}
  >
    {children}
  </DiaryContext.Provider>
)
```

Next, we need to now implement `editDiaryPost` inside of our `EditScreen`:

```jsx
<PostForm
  initialValues={{title: post.title, content: post.content}}
  onSubmit={(title, content) => {
    editDiaryPost(id, title, content)
  }}
/>
```

Finally, we need to add a case to our reducer function:

Conditional version:

```jsx
case 'edit_post':
  return state.map((post) => {
    // if the id matches the one we need to edit,
    // return the new payload instead of existing info
    if (post.id === action.payload.id) {
      return action.payload
    } else {
      // otherwise, return the existing post info
      return post
    }
  })
```

Ternary Version:

```jsx
case 'edit_post':
  return state.map((post) => {
    return post.id === action.payload.id ? action.payload : post
  })
```

## One Last Programatic Navigation

Theres one last thing to complete. It sure would be nice if we automatically navigated to either the `IndexScreen` or `ViewScreen` once our edits have been saved. Since we already know how to navigate to a named screen, let's take a look at backwards navigation.

Our `navigation` prop contains more than just the `navigate()` function.

There is also a `pop` function that removes the current route and goes backwards to the previous screen. In order to implement this, we will need to add a callback argument to our `editDiaryPost` function.

Inside `EditScreen` add a fourth argument to our `editDiaryPost`:

```jsx
<PostForm
  initialValues={{title: post.title, content: post.content}}
  onSubmit={(title, content) => {
    editDiaryPost(id, title, content, () => navigation.pop())
  }}
/>
```

Next, we need to edit our edit post action:

```jsx
const editDiaryPost = (id, title, content, callback) => {
  dispatch({
    type: 'edit_post',
    payload: {id, title, content},
  })
  callback()
}
```

One final thought: What if a callback is not always provided when we call `editDiaryPost` or `addDiaryPost`? Our code would result in an error. Just to play it safe, we can wrap both of these callbacks in a conditional statement:

```jsx
const editDiaryPost = (id, title, content, callback) => {
  dispatch({
    type: 'edit_post',
    payload: {id, title, content},
  })
  if (callback) {
    callback()
  }
}
```

Great. We have a fully functioning CRUD app! Next class we will look at data persistence with a JSON Server, as well as an optional Context code refactor to introduce ourselves to some more 'clever' elegant code.
