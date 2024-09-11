# Component Library w/ Routes

Before we dive into routes, we are going to make a reusable `<Button />` component with many variations in styling. Why? Because in our projects outside of the class, we will probably be working within a style guide with a components library. Today we are going to focus on a singlecomponent in our components library. This will introduce type checking with the PropTypes library and atomic styling with Tailwind CSS. Once we have a component (or two) we will introduce React Router to display different variations of our component on multiple pages.

**Todays Goals:**

- Create a reusable Button component with many variations as the beginning of a components library
- Use an external CSS library called Tailwind CSS to learn about atomic styling, and in the process, be forced to create the smallest, most reusable components possible.
- Learn about PropTypes library for prop type checking and eventually switch over to Flow or Typescript which are more widely used these days.
- Introduce React Router so we can navigate to different pages within the same app

**Future Goals:**
We have a reusable customizable component or two. Rather than go through the trouble of maintaining the Style Guide ourselves, we can take a look at Styleguidist. We can take the work we have already done to generate a Component Library within this _same project_ .

## Button Component

First let's discuss a few items and install a few libraries

- common button variations
- the built in `children` prop
- proptypes

### Installing and Using TailwindCSS

https://tailwindcss.com/docs/guides/create-react-app

Looking up and applying atomic styles via Tailwind:
`command/control K` to search

### Install classnames for conditional styling

https://www.npmjs.com/package/classnames

Note: classnames will ignore undefined vars! This applies to us today with all of our Button’s boolean props.

```
import cx from ‘classnames’


const primary = true
const succes = false

// for each key value pair… apply if TRUE

const classes = cx({
  ‘bg-blue-500’ : primary,
  ‘bg-green-500’): secondary,
})
```

Personally, I needed tailwind merge for text-white issues with outline buttons. If your outline buttons still have white text:

https://www.npmjs.com/package/tailwind-merge

```jsx
import { twMerge } from 'tailwind-merge'

...

const classes = twMerge(
	cx( 'px-3 py1.5 border',{
		'bg-blue-500' : primary,
		'text-blue-500': primary && outline
	})
)
```

## In Class Exercise:

Let’s now apply all of our conditional classes together!

- do a few console log examples of what cx evaluates and applies…
- mix and match all the time and conditional classes
- apply color variations for button type
- apply pill styles and outline styles

### What about Icons in our buttons?

React Icons gives us access to a ton of icon libraries such as font awesome or material design:

`react-icons.github.io/react-icons` - copy and past into browser to view documentation

The author of this library smashed them all together and made them all work the same in this library

We can import whatever icons we want to use in a button _where ever we are using the button_ and pass it in as children to our Button component.

Hmmm. The icon winds up smashed right up against out button text. We could make a conditional display class to our defaults in `Button.js`. Since we need a space before the text when we have an icon in a button each time.

`<Icon className=“mr-1” />`

Downside? we need to do this on the usage not the component once. Instead we can add a global style inside of `index.css` the old fashioned way.

```css
button > svg {
  margin-right: 0.25rem;
}
```

How do we add an event handler to this Button not button?

```jsx
onClick = {handleClick}
```

`onClick` needs to be passed down as a `prop` to our new fancy button right?
_What about other event handlers like mouseOver etc?_

So far our props our special Button cares about are or styling. How do we account for other props another engineer might care about? We need to collect all of the additional `props` intended for a plain html button element using special JS syntax:

`...otherProps` in our props in Button takes all of the others and assigns them to the var named `otherProps`.

Now we need to apply them to lowercase button inside Button

```jsx
return (
	<button {…otherProps} className="custom-class" etc>
)
```

That handles most cases such as our built in event handlers but what about passing down special classNames to override some styling?

<Button primary className=“mb-5” >Special class button </Button>

Yuck, now we have 2 className props and we are obliterating the custom one with the previous className we applied in our app.

`otherProps` to the rescue again! we can add `otherProps.className` inside our base classes. Remember, classnames library ignores null and undefined!

```jsx
const classes = twMerge(
	cx(otherProps.className, 'px-3 py1.5 border'{
		'bg-blue-500' : primary,
		'text-blue-500': primary && outline
	})
)
```

## Components vs Pages

Components are reusable, pages are also components not intended to be reused like home, about, checkout. Pages will have our usual components nested inside, and maybe a shared NAV? Right now App is serving as our PAGE

First lets think about how we organize out components

group by feature

src/home/

- homepage.js
- signup.js

src/checkout/

- checkoutpage.js
- checkoutbutton.js

Hmm but we want to share our button all over the place right?

an alternative is group by type

- components/
- pages/
- ui-components/

what about a hybrid?

- components
  - buttons
  - cards
  - forms
- pages
  - home.js
  - contact.js

Don’t get to overwhelmed with this!
Work will probably have their way of organizing and you’ll have to search for files in VScode at work to find individual files. Just remember you ned to import these files from the right place!

Let's add some directories to start organizing our project

- src/components
- src/pages

Drag and drop `Button.js` into our `components/` and you _should_ get an update manually import alert. This is optionally enabled in VS code. If it is not for you, take a moment to fix your imports of `Button.js`.

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

## React Router

Before we jump to React again, let's talk about how a normal website loads and displays content vs a React project. When the browser loads a new HTML document, **all existing JS variables and code is dumped**. Not a huge deal for traditional html website. Not so great for React apps though.

Traditional sites make one requests a page instantly has the content it needs, each page has a new file with everything it might need.

React, always makes a request for index.html first, then another for bundle.js, and then possibly api endpoint calls for content. Takes a little more time to get content!

How routes work with React:

- bundle js looks at the current address and decides what content to show and applies a series of different routing rules to show different components based on which route the user
- react see a user clicks a link and intercepts the usual navigation event
- the address bar updates so the user thinks they are going to a page
- react renders a new page/component based on the route
- BUT THE JS ENVIRONMENT ISNT RESET
- so if the user clicks back, we already have the previous state for the old page and we instanty get content with no requests
- this only works correctly if STATE is NOT defined in the component (context breaks this rule, so does redux)

`create react app` makes sure we always load index.html, if we take a look at the networks panel and doc tab, we will see a request for public.html. change the route in localhost, we are always getting `index.html` file

How do we look at the address bar and how so we figure out what content to show? the domain name and port do not matter, the path however does. in our case its /buttons or /accordion

open your console console type `console.log(window.location)`, expand and see pathname. Looks like what we are looking for is `window.location.pathname`.

OK, so how do we trick the user by updating the address bar?
changing window.location causes a full page refresh! we do not want that! remember we dump all of our JS when this happens.

We need `window.history.pushState( {}, ‘’, ‘/button')`. Here, window will not do a full page refresh!

OK what about a user clicking a link or pressing the back or forward buttons?

1. clicking on a link:

- react component called Link({to})
- event.prevemntDefault() stops standard navigation
- handleClick to detect a click

2. back-forward buttons clicked:
   When a user clicks back or forward, a window emits a pop state event, but only if window.pushState was used for the previous navigation. but this doesn’t handle the total page refresh. the stack keeps track of the navigation called a stack

```jsx
window.history.pushstate({}, “”, /route1)
window.history.pushstate({}, “”, /route2)
```

back button will work here but not if a user manually types in a new url to the nav bar. This would result in a full refresh/reload.

We will need to add an event listener for a `popstate` event.

### Next Steps

Next class we will install React Router and use the built in `<Link>` component to build out some routes and navigation before adding more components to our library.
