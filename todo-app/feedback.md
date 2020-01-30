- Make filenames that contain components always start with a capital letter (reminder.js)
- Use a formatter (prettier) and check out how to integrate it with atom if you're still using it or VS Code. It should be run every time you save
  the file to ensure you have well formatted code every time.

- Never use one letter variable names. Example from your code:

```js
function handleKeyDown(e, i) {
  if (e.key === "Enter") {
    createTodoAtIndex(e, i);
  }
  if (e.key === "Backspace" && todos[i].content === "") {
    e.preventDefault();
    return removeTodoAtIndex(i);
  }
}
```

- I would change this to a filter function. Check out the array methods in Javascript (map, filter, and reduce specifically). They are
  incredibly helpful and I use them all the time.

```js
// Does this work? You're passing `setTodos` a function, not an array.
setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
```

becomes

```js
setTodos(todos.filter(( _, index) => index !== i )));
```

- Better to use document.querySelector in this case:
  `document.forms[0].elements[i + 1].focus();`

- For your `setInterval` call check out the React hook `useEffect`. That hook allows a function to be called _once_ when the component is
  first mounted. Otherwise your `setInterval` call will happen each and every time React re-renders the component.
