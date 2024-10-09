# Vue3 Notes:

I this doc, I want to share my experience of learning Vue3 from different sources.

## Sources:

| Title | Link |
| --- | --- |
| Vue3 Official Tutorial | [Link](https://vuejs.org/tutorial/#step-1) |

## Topics:

| Title | Link |
| --- | --- |
| Installation | [Link](#installation) |

# Installation

Using npm:

```bash
npm create vue@latest
npm install vuejs
cd vuejs
npm run dev
```

Vue in based on Vue Single-File Components (SFC). An SCF is a reusable self-contained block of code that contains and encapsulates HTML, CSS and also JavaScript together. witten inside a filewith `.vue` postfix.

The core feature of Vue is **declerative rendering**: using a template syntax that looks like a HTML syntax, We can descibe how should the HTML look based on the javascript state. When the state changes, the HTML file will updates automatically.

State that can trigger updates when changed is considered **reactive**. We can declare reactive state using Vue's `reactive()` API. Objects created from `reactive()` are Javascript **Proxies** that work just like normal objects:

```js
import { reactive } from 'vue';
const counter = reactive({
    count: 0
})

counter.count++
console.log(counter.count); // 1
```

> [!NOTE]
> `reactive()` only works on objects (including arrays and built-in types like `Map` and `Set`).
> `ref()`, on the other hand, can take any value types and create an object that will get you the value under a `.value` property.

```js
import { ref } from 'vue';
const message = ref("");

messages.value = "Hello World!"

console.log(messages.value) // Hello world
```

> [!IMPORTANT]
> These 2 methods will help us in future to make dynamic components!

## Attribute Binding:

In Vue, we call `{{  }}` mustaches and they're only used for text rendering.
However, to bind an attribute to a dynamic value, we use `v-bind` directive.

```vue
<script setup>
import { ref } from 'vue';
const dynamicID = ref("");
</script>

<template>
    <div v-bind:id="dynamicID"></div>
</template>
```

A directive is a special attribute that starts with the v- prefix. They are part of Vue's template syntax. Similar to text interpolations, directive values are JavaScript expressions that have access to the component's state.

The part after the colon (:id) is the "argument" of the directive. Here, the element's id attribute will be synced with the dynamicID property from the component's state.

> [!NOTE]
> Because v-bind is used so frequently, it has a dedicated shorthand syntax:

```vue
<div :id="dynamicId"></div>
```

## Event Listeners:

We can listen to DOM events using the v-on directive or use shorthand syntax:

```vue
<script>
    import { ref } from 'vue'

    const count = ref(0);
    const increment = ()=>{
        count.value++;
    }
</script>

<template>
    <button v-on:click="increment"></button>
    <button @click="increment"></button>
</template>
```

> [!IMPORTANT]
> Event handlers can also use inline expressions, and can simplify common tasks with modifiers

```vue
<script>
    import { ref } from 'vue'

    const count = ref(0);
</script>

<template>
    <button @click="count++"></button>
</template>
```

> [!NOTE]
> For better understanding of event handlers, try to read [this page](https://vuejs.org/guide/essentials/event-handling.html)

## Form Binding:

Using `v-bind` and `v-on` together, we can we can bind a form input element:

```html
<script setup>
const onInput = (e)=>{
    text.value = e.target.value;
}
</script>

<template>
    <input :value="text" @input="onInput" />
</template>
```

Also, to simplify two-way bindings, Vue provides a directive, `v-model`, which is essentially syntactic sugar for the above:

```html
<template>
    <input v-model="text" />
</template>
```

> [!NOTE]
> `v-model` not only works for the input, but also it works for checkboxes, radio buttons and select dropdowns.

## Conditional rendering:

We can use the `v-if` directive to conditionally render an element:

```vue 
<h1 v-if="condition">If it's true, display me</h1>
```

This <h1> will be rendered only if the value of condition is `truthy`. If awesome changes to a `falsy` value, it will be removed from the DOM.

We can also use v-else and v-else-if to denote other branches of the condition:

```vue 
<h1 v-if="condition">If it's true, display me</h1>
<h1 v-else-if="condition2">If this is true, display me</h1>
<h1 v-else>If there is no true condition, then display me</h1>
```

## List rendering:

We can use the v-for directive to render a list of elements based on a source array:

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

Here todo is a local variable representing the array element currently being iterated on. It's only accessible on or inside the v-for element, similar to a function scope.

The `key` attribute is for Vue to identify each element from eachother.

For update the array, there are 2 ways:

1. Push something on array:

```js
todos.value.push(newTodo)
```

2. Remove an element from array:

```js
todos.value = todos.value.filter(/* ... */)
```

## Computed property:

If we want to bind a variable to an input, we can do this by `v-model` same as before. For instance in the previous example:

```js
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

Introducing `computed()` method, we can create a computed ref that computes its `.value` based on other **reactive** data source.

```js
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn JavaScript', done: true },
  { id: id++, text: 'Learn Vue', done: false }
])

const filteredTodos = computed(() => {
    if (hideCompleted.value){
        return todos.value.filter(todo => !todo.done)
    }
    return todo.value
})
```

The `computed()` property will track other reactive dependencies used in its computation. It caches the result and automatically updates it when its dependencies change.

## LifeCycle and Template Refs:

We can bind an element to a refrence to manually handle DOM update by ourself. 
For doing this, We can use template refrences in Vue:

```html
<script setup>
    import { ref, onMounted } from 'vue';
    const pElementRef = ref(null);
    onMounted(()=>{
        pElementRef.value.textContext = "Updated Text";
    })
</script>
<template>
<p ref="pElementRef">hello</p>
</template>
```

First of all, we create a `ref object` with a given `null` value. After that we can use one of the Vue lifecycle Hooks, to manually manage the DOM behaviour.

## Watchers:

Sometimes we do need a method to watch on some variables to do an action when changes happen. To achieve this, we can use the watchers:

```html
<script setup>
import { ref, watch } from "vue";
const count = ref(0);
watch(count, (newCount) => {
    console.log(`New count is ${newCount}`);
})
</script>
```

`watch()` can directly watch a ref, and the callback gets fired whenever `count`'s value changes. `watch()` can also watch other types of data (e.g: `reactivity()`).

A more practical example than logging to the console would be fetching new data when an Id changes!

Example:

```html
<script setup>
import { ref, watch } from 'vue'

const todoId = ref(1)
const todoData = ref(null)

async function fetchData() {
  todoData.value = null
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  todoData.value = await res.json()
}
// For the initial one
fetchData()

watch(todoId, (newTodoId)=> {
    // Will fetch a new todo when user click on the next button
    fetchData();
})
</script>

<template>
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++" :disabled="!todoData">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>
</template>
```

---

## Components:

So far we have only worked with a single component. However real Vue applications are typically worked with nested components. 
A parent component can render another component in its template as a child component we need to first import it:

```js
import ChildComponent from "./path/to/the/childComponent.vue";
```

Then we can use it in our template:

```vue
<script>
import ChildComponent from "./path/to/the/childComponent.vue";
</script>
<template>
    <ChildComponent />
</template>
```

## Props:

A child component can accept input from the parent via **Props**. First, it need to declare the props that want to accept:

```vue
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

Note `defineProps()` is a compile-time macro and doesn't need to be imported. Once declared, the `msg` prop can be used in the child component's template.It can also be accessed in JavaScript via the returned object of `defineProps()`.

The parent can pass the props to child like this:

```vue
<ChildComponent :msg="Hello World" />
```

## Emits:

In addition to recieving props, a child component can also emit events to the parent:

```vue
<script setup>
const emit = defineEmits(['response']);
emit("response", "Hello from child");
</script>
```

The `emit` function takes 2 argument:

The first argument is event name. Any additional arguments are passed on to the event listener.

The parent can listen on the child-emmited events using `v-on`. Here the handler will recieve the emitted message and assign it to the ref variable:

```vue
<script setup>
    import { ref } from "vue";
    import ChildComponent from "./ChildComponent.vue";
    const childMessage = ref("");
</script>

<template>
    <ChildComponent @response="(message) => childMessage = message" />
</template>
```

## Slots:

In addition to passing data from parent to child with props, the parent element could also pass down template data using **slots**:

```vue
<ChildComponent>
    This is some Slot
</ChildComponent>
```

In the child component, it can render the slot content from the parent using `<slot>` element as outlet:

```vue
<template>
    <slot>FallBack Content</slot>
</template>
```

Content inside the <slot> outlet will be treated as "fallback" content: it will be displayed if the parent did not pass down any slot content.