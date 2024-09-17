# Component Library Continued

Last week to created our first reusable atomic component for our component library/style guide. Most compoanies with a dev team and several web based products and a website will want consistent branding/styling/spacing across all of their products. By making a `<Button >` component for developers to always use rather than building one from scratch with the `<button>` element, we not only save dev time in the future, but we ensure consistency across projects/teams. Another perk is if we want to change the styling of one or many of our variants for the `<Button>` component, we change it in one place, and it will change where ever it was implemented.

This week we will continue with 2 other common components for our StyleGuide. First we will do a deep dive into the state design process while building an `<Accordion>` component. Then we will move on to create a `<Modal>` component (pop up window with content and call to action/close buttons). As we build out our Modal component, a few common problems will arise which we will solve by introducing the `useEffect` hook and ReactDOM's `Portal` creation hook.

## Picking up where we left off

Inside this Week03 folder, there is a `comp-lib-start` folder. We will all start off with where we ended last class just to make sure we are on the same page. Before we begin, do a git pull from the class repo, and copy the `comp-lib-start` folder to where ever you take notes for this class. _DON'T edit folders/files within the class repo, that will cause a conflict next time you need to pull_

- `cd` or `dir` into the `comp-lib-start` folder that you copied elsewhere on your computer
- Since our `.gitignore` file makes sure we ignore and folder named `node_modules`, we now need to run `npm i` or `npm install`. Running that command will take a look at the `package.json` file and install all of the listed dependencies in the `node_modules` folder.
- Now, we can run `npm start` and see our project on our dev server.

## Reusable Accordion component

reusable customizable accordion list of accordion elements as items props:

- header with expand collapse icon
- content

We wind up with and array i items with heading and content

Let’s make up some dummy data for testing out our accordion:

```jsx
const items = [
  {
    id: '123',
    label: 'How many chickens should I own?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed maximus nunc, a scelerisque erat. Curabitur dapibus mauris ut eros vestibulum lacinia at in nisi. Praesent gravida lacus pharetra, aliquet diam et, aliquam leo. Suspendisse malesuada, nibh at lobortis egestas, dui lacus eleifend ligula, sed blandit nunc ipsum non magna. Morbi risus lacus, viverra ac nisi quis, aliquam tempor risus. Pellentesque egestas tempus lectus. Duis odio erat, ornare sit amet varius in, gravida rhoncus sem. Curabitur vehicula orci finibus leo lacinia, sit amet malesuada neque faucibus. Phasellus a pellentesque leo. Vivamus egestas mauris vitae viverra posuere. Phasellus vulputate mauris ac urna tempor, eget maximus est lobortis. Fusce nisl orci, dignissim vel dui vel, tincidunt cursus nisi.',
  },
  {
    id: '456',
    label: 'Do I need a rooster?',
    content:
      'Quisque vestibulum faucibus volutpat. Sed vitae elementum libero. Quisque accumsan erat eget nisl maximus, vel pulvinar nisl vestibulum. In hac habitasse platea dictumst. Integer id massa vitae sem porttitor egestas quis nec ante. Praesent consectetur cursus lacus, ut sodales lacus bibendum at. Nulla eu libero et ligula malesuada posuere porttitor et mi. Mauris orci nibh, bibendum vitae neque ut, porttitor fermentum nisl. Maecenas blandit arcu non nunc mattis, vel ornare tellus efficitur.',
  },
  {
    id: 'l1kj2i0g',
    label: 'When do chickens molt?',
    content:
      'Duis eget turpis vel ligula imperdiet suscipit eu ut felis. Ut eget neque at ligula aliquam ultricies eu vitae dolor. Proin eu dignissim velit. Morbi convallis volutpat nisl at vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam non dignissim sem. Aliquam cursus, tortor at iaculis fermentum, felis tortor interdum justo, eu ornare lorem dui eu lorem. Phasellus nibh sem, tempus at fermentum vel, pulvinar at tellus. Nunc eleifend velit at massa bibendum placerat. Sed tincidunt vestibulum ante ut pellentesque. Duis eget nisl varius, dapibus nunc sed, aliquam diam',
  },
]
```

map through items array to render out each item! don’t forget about keys when mapping!

```
items.map(i(item) =>  {
	return (
      		<div key={item.id}>
        		<div>{item.heading}</div>
        		<div>{item.content}</div>
      		</div>
    )
})
```

Now, we want to hide/show based on user interaction.

user interaction + update content = STATE

### State Design Process

Here is a nice way to answer where and what we should name our state and handlers, and where they belong in our App. It might seem overkill, but what if we want our accordion to be TRULY reusable.

What State and Events?

- list out what a user needs to do and the changes they need to see
  - describe a user flow
  - a user clicks on a section header, it needs to expand, and the other sections should all be collapsed
- what is state and what is an event handler
  - actions = event handler
  - something on the screen changing = state
  - what can be simplified?
  - what is on the screen isn’t one of the above?
- What name and Type?
  - If we were to write a function to change the screen for any variation of what the user might see, what arguments does this function need? Seems like we need an index for each item in our array of items we are rendering, let’s call it `expandedIndex`.
  - `onClick={handleClick}` is a nice convention for our handler here
- Where should they be in our code?
  - When should it be in the App? When should it be in the component? Does any other component needs to know about that piece of state (reasonably)? If yes? in the app, if no, in the component.
  - Event handler should usually be defined in the same component as the state that it modifies.

### Conditional Rendering

Back to our Accordion component. We are going to not even bother rendering the content for items that are not expanded (index !== expandedIndex). Luckily we can take advantage of some built in js functionality called boolean expressions.

Reminder:

`||` gives back the first value that is truthy
`&&` gives back the first falsey value OR the last truthy value.

How does this work for us here in React. Remember react does not render bools, nulls, or undefined.

```jsx
const renderedItems = items.map((item, index) => {
  const isExpanded = index === expandedIndex
  const content = isExpanded && <div>{item.content}</div>

  return (
    <div key={item.id}>
      <div>{item.heading}</div>
      {content}
    </div>
  )
})
```

We can also remove our content variable completely and insert our expression into our rendered content.

```jsx
import {useState} from 'react'

export default function Accordion({items}) {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex
    return (
      <div key={item.id}>
        <div>{item.heading}</div>
        {isExpanded && <div>{item.content}</div>}
      </div>
    )
  })
  return <>{renderedItems}</>
}
```

This is a widely used technique to remember!

### Adding our click event handler:

`handleClick` needs to update our current expandedIndex in state. Luckily our conditional rendering will take care of removing the content div for all other indexes!

Today we are going to use the shorthand version since we only have one line of code, and since we have a mapping function to render our content, we have access to each item’s index. The tradeoff here is no longer have an explicit callback named `handleClick` and can make JSX harder to read. Don’t forget we are creating a different onClick handling function for each item we render.

### Conditional Icon Rendering

We need to change the direction of upper right Icon in the heading divs for each of our items based on if the item is expanded or not. We can use another form on conditional rendering here called a ternary.

```jsx
const icon = <span>{isExpanded ? 'DOWN' : 'LEFT'}</span>
```

The above code evaluates as follows:

IF `isExpanded is TRUE, return/render ‘DOWN’
otherwise or IF `isExpended is FALSE, return/render ‘LEFT’

We can place this `icon` inside out heading div.

```jsx
<div onClick={() => setExpandedIndex(index)}>
  {item.heading}
  {icon}
</div>
```

Now we can import the appropriate icons from React Icon Library and swap out the text above, with the appropriate icons.

Don’t forget to import them at the top of our file:

```jsx
import {GoChevronDown, GoChevronLeft} from 'react-icons/go'
```

In our mapping function below:

```jsx
const icon = <span>{isExpanded ? <GoChevronDown /> : <GoChevronLeft />}</span>
```

All that is left is adding our styling with TailwindCSS.

### Optional Variation: Close them all!

Close them all on load
set default state: :
`useState(-1)`

Close them all when you click the open item:

```jsx
const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1)
    } else {
      setExpandedIndex(nextIndex)
    }
  }
…
onClick={handleClick(index)}
```

## Portals

Another common reusable component in a project’s style guide or component library is a modal. Modals are a great learning opportunity for us because a few interesting questions arise when building them.

- Where does the isOpen logic live?
- What is the event that opens the modal? Where does it live?
- How do we ensure the modal, and its overlay always cover the entire screen regardless of where the modal instance lives in our code?

First, lets cover our setup tasks: - make a`Modal.` empty/starter component - make a `ModalPage` - Add a route for `/modal` to show the ModalPage - Add a `Link` with the path to `/modal`

Back to the original questions. What event opens the modal? Where does the `isModalOpen` state live in our code?

We can use our new fancy `Button` component to open our `Modal` with an `onClick` handler. The piece of state for `isModalOpen` can live in our `ModalPage` since it is a parent of both the `Button` and the `Modal`. This also allows us to show our modal whenever we want, with whatever event we want, applied to any child component we want.

```jsx
import {useState} from 'react'
import Button from './components/Button'
import Modal from './components/Modal'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(true)
  }
  return (
    <div>
      <Button outline success onClick={handleClick}>
        Open Modal
      </Button>
      {isModalOpen && <Modal />}
    </div>
  )
}
```

Now, let’s shift to our modal. A modal has 2 main parts, an Overlay to cover all of the other existing content on the entire screen, and some sort of ModalWindow or ContentBox to display contents of the modal to the user that’s ideally centered in our screen.

```jsx
export default function Modal() {
  return (
    <>
      <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
      <div className="absolute inset-40 p-10 bg-white">
        Check out my modal content!
      </div>
    </>
  )
}
```

OK. It works! But that’s because we are implementing it in a simple page with nothing much going on. What if we were using it in a more complex page? Remember:

```css
position: absolute;
```

places the element at the top left corner of the closest parent with a position other than static (default).

Tailwind CSs’s rule `inset-0` applies the rules:

```css
top: 0;
left: 0;
bottom: 0;
right: 0;
```

which will full the parent element with a position other than static. If all parent elements are positioned static, our modal works just fine.

What if we had a positioned parent element on the page? Let’s add to the first div in our `ModalPage`

```
<div className=“relative”>
```

YUCK! But hey, that’s a real life Modal problem isn’t it?

Portals to the rescue! A Portal tells React to place an elements HTML elsewhere in a place of our choosing.

In `index.html` right before the closing `<body> ` tag add a div with an ID of modalContainer:

```html
…

    <div id="modalContainer"></div>
  </body>

```

Now we need to use a new method from `ReactDOM` called `createPortal(children, container)`

`createPortal` takes 2 arguments:

1. The element/component to render inside the Portal
2. The element to serve as the Portal.

```jsx
import ReactDOM from 'react-dom'

export default function Modal() {
  return ReactDOM.createPortal(
    <div>
      <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
      <div className="absolute inset-40 p-10 bg-white">
        Check out my modal content!
      </div>
    </div>,
    document.getElementById('modalContainer')
  )
}
```

Boom. Easy enough! If we find we need a reusable Portal component in the future of this project, we can create a reusable `Portal` component, that accepts a Modal, or any other component we want to inject as `props.children`.

Back to our Modal. We now need to add the close functionality. We need to define the handler in the parent/ModalPage component and pass it along to our Modal as a prop called `onClose`.

ModalPage:

```jsx
  const handleClose = () => {
    setIsModalOpen(false)
  }

…

{isModalOpen && <Modal onClose={handleClose} />}

```

Modal:

```jsx
<div
  onClick={onClose}
  className="absolute inset-0 bg-gray-300 opacity-50"
></div>
```

Now when a user clicks anywhere on the gray overlay, the modal will close. But we probably want to add a close button inside an actionBar in the Modal as well.

Note: We could make and style a close button within a header inside our modal too. We are using an `actionBar` from the parent right now so that we could add as many actions/buttons as we wish in the future, making this `Modal` component event that much more customizable! Maybe we have a step by step tutorial wizard, or a confirm/deny prompt? Now that is all possible.

```jsx
import {useState} from 'react'
import Button from './components/Button'
import Modal from './components/Modal'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const actionBar = (
    <div>
      <Button primary onClick={handleClose}>
        Accept and Close
      </Button>
    </div>
  )

  return (
    <div>
      <Button outline success onClick={handleClick}>
        Open Modal
      </Button>
      {isModalOpen && (
        <Modal onClose={handleClose} actionBar={actionBar}>
          <p>Hey I'm some modal content!</p>
        </Modal>
      )}
    </div>
  )
}
```

Don’t forget to receive the new props in Modal. Some new Tailwind sales are also applied here:

```jsx
import ReactDOM from 'react-dom'

export default function Modal(props) {
  const {children, actionBar, onClose} = props
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-300 opacity-50"
      ></div>
      <div className="absolute inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">{children}</div>
        <div className="flex justify-end">{actionBar}</div>
      </div>
    </div>,
    document.getElementById('modalContainer')
  )
}
```

One last thing. What happens to our Modal and its overlay if we have enough content on our page, for the window to need to scroll? Let’s simulate that with some `lipsum` and then fix it by disabling scrolling when a modal is open.

Enter `useEffect` yet again. In this case, we are going to apply a styling rule `overflow:hidden` when the modal is open. Don’t forget to at the top.

```jsx
import {useEffect} from 'react'
```

```jsx
useEffect(() => {
  // disable scrolling when the modal is open
  document.body.classList.add('overflow.hidden')

  // remove the overflow-hidden style when the modal closes
  return () => {
    document.body.classList.remove('overflow-hidden')
  }
}, [])
```

Great! But what if our button and modal code is somewhere on the page we had to scroll to get to? Absolute positioning is always going to place it at the top of our document. This is unintended/not ideal behavior. We can easily fix this by changing our `absolute` classes to `fixed`.

```jsx:
<div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-50"
      ></div>
      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">{children}</div>
        <div className="flex justify-end">{actionBar}</div>
      </div>
    </div>
```
