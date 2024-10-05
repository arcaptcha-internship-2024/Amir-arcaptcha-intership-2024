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

