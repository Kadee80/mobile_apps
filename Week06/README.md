# Midterm Project/Presentations: Due Thursday October 17

By the end of Tuesday's class you will have 3 versions of a Todo List application. Your HW last week was to add some much needed styling to our app.

Your Midterm for this class will be to add **at least one new input field** to the Todo List application we built together in class. This additional field should be based on a user story you create. Remember, it's only a TodoList because we said so. We built it so that we could cover a few learning topics, but its main functionality is to Create Render Update and Delete something we named `title`. We store our titles as objects with a unique ID and a `title` field. Pick a more specific use case for your Todo App and add a new field to your application.

For example:
My TodoList is actually a work task list. Sometimes tasks run late, sometimes they are blocked by other work my team needs to complete.

"As a user, I would like to Create/View/Edit/Delete my HW assignments and color code them by status (red, yellow, green)."

As a developer...

- I know I need to add a new dropdown field to my CreateTodo and EditTodo forms named `status`.
- The dropdown options are `on time`, `late` and `blocked`.
- The dropdown (select/option element) will need to have an `onChange` event listener and a `handleChange` function.
- The dropdown field will need to be bound to a new piece of `Local State` also named `status` (by binding the value attribute).
- Each `TodoItem` will have a `background-color` that corresponds to it's current `status`. Conditional classnames will be applied with the help of the library `classnames`.
- I know I will need to update my Todo objects to expect the additional key `status` in my `TodoContext` and any instance of the `todo` within the App.

Next thursday you will present your "new" application. Be sure to describe a more specific use case for your app. Any new functionality should be described as a user story. That user story should inform what field(s) needs to be added to your forms.

Midterm Project/Presenatation checklist:
_I highly recommend making a slide deck for your presentation_

- [ ] 1-3 sentence elevator pitch of what your application is/who it is for.

- [ ] User story that includes your new field aka new app functionality.

- [ ] A developer checklist (written before your start)

- [ ] A revised checklist of what you actually had to do to implement it. Did you initially forget something critical?

- [ ] Live demo of your App. Your app should be styled for mobile devices. Please use the responsive function in google developer tools when you present or resize your browser to a smaller portrait oriented size.
