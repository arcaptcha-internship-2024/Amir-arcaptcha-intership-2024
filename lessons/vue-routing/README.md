# Vue Routing Note

In this markdown, I'm going to focus on vue-routing version 4 and see whats are the features and how can we use it in a real project.

> [!IMPORTANT]
> I'm using composition API in Vue, so this markdown is based on this API. If you're using options API, it is better to take look at [official document](https://router.vuejs.org/guide/)

## Starting point

```vue
<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```

In example above, there are two different components that we will cover them:

- `RouterLink`

Instead of using regular `<a>` tags, we use the custom component `RouterLink` to create links. This allows Vue Router to change the URL without reloading the page, handle URL generation, encoding, and various other features.

- `RouterView`

The **RouterView** component tells Vue Router where to render the current route component. That's the component that corresponds to the current URL path. It doesn't have to be in App.vue, you can put it anywhere to adapt it to your layout, but it does need to be included somewhere, otherwise Vue Router won't render anything.

- `$route`

The example above also uses `{{ $route.fullPath }}`. You can use `$route` in your component templates to access an object that represents the current route.

## Creating the router instance

The router instance is created by calling the function `createRouter()`:

```vue
<script setup>
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
</script>
```

## Registering the router plugin
Once we've created our router instance, we need to register it as a plugin by calling `use()` on our application:

```js
createApp(App)
  .use(router)
  .mount('#app')
```

Like with most Vue plugins, the call to `use()` needs to happen before the call to `mount()`.

## Accessing the router and current route

Sometimes, we do need to have access to the `router` from elsewhere in our application. For doing this, we have to use `useRouter` and `useRoute` components that are registered globally, when we register router by `createApp(App).use(router)`.

```vue
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
</script>

<template>
  <h2>AboutView</h2>
  <label>
    Search: <input v-model.trim="search" maxlength="20">
  </label>
</template>
```

> [!NOTE]
> To understand above example, please be familiar with `computed` in Vue. [Link](https://vuejs.org/guide/essentials/computed.html#writable-computed)
> The example above will have a input that is bind with `search` variable. When user type something in input, the `setter` will call in computed variable and assign the new `search` value to the router queries.
> If, there is a need to get and display value, the `getter` method will call and get the query from exact route and render it for you

## Dynamic Route Matching with Params

Sometimes, we do have a component that must be rendered for an specified param key. For instance, we have a `User` component that we want to render it and the content will change by the given user ID in url param:

```vue
<script setup>
import User from './User.vue'

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon
  { path: '/users/:id', component: User },
]
</script>
```

Now, by change the user ID, we can access different users profile page, like `/users/john/` or `/users/mike`. These urls will map us to the same route, but we can handle the behaviour by ourselves.

A *praram* is denoted by colon `:`. When a route is matched, the value of the params will exposed as `route.params`. So we can access the param and do anything we need:

```vue
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const userID = route.params.id;
</script>
```

> [!NOTE]
> You can have multiple params in same route, and they will map to corresponding fields on `route.params`

| pattern | matched example | route.params |
| --- | --- | --- |
| /users/:username | /users/john | { username: "john" } |
| /users/:id/posts/:post_id | /users/john/posts/10 | { username: "john", post_id: 10 } |

## Reacting to param changes

One thing to note when using routes with params is that when the user navigates from `/users/johnny` to `/users/jolyne`, the **same component instance**
**will be reused**. Since both routes render the same component, this is more efficient than destroying the old instance and then creating a new one. 
However, this also means that the lifecycle hooks of the component will not be called.

To react to params changes in the same component, you can simply **watch** anything on the route object, in this scenario, the `route.params`:

```vue
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.params.id,
  (newId, oldId) => {
    // react to route changes...
  }
)
</script>

```

