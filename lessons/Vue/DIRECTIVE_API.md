# Directive

In VueJS, we do have an API named Directive, that used to bind variables to tags.
In this markown, we're gonna review what types are availabe in Vue Directive API and how and when to use them.

## v-text

Update the elements text content.

- Expect: `String`
- Details:

`v-text` works on textContent property, so it will overwrite any existing content inside the element. If you need to update the part of `textContent`, you should use `mustache interpolations` instead.

- Example:

```vue
<span v-text="msg"></span>

<!-- Or -->

<span>{{ msg }}</span>
```

---

## v-html

Update the element's `innerHTML`.

- Expect: `String`
- Details:

Contents of `v-html` are inserted as plain HTML - Vue template syntax will not be processed. If you find yourself trying to compose template using `v-html`, try to rethink the solution by using the **Component** instead.

> [!IMPORTANT]
> The v-html is not really secure and it can easily lead to `XSS attacks`.
> In the single file components, `scoped` styles will not apply to the content inside `v-html`, because that html is not processed by Vue's template compiler. Instead you have to use an external css file or another `<style>` tag.

- Example:

```vue
<span v-html="htmlContent"></span>
```

---

## v-show

Toggle the element's visibility based on the truthy-ness of the expression value.

- Expect: `any`

- Details:
`v-show` works by setting the `display` CSS property via inline styles, and it will try to respect the initial `display` value when the element is visible. It also triggers transitions when its condition changes.

- Example:
```vue
<h1 v-show="status">Hello!</h1>
```

> [!NOTE]
> `v-show` neither work on `<template>` element, nor does it work with `v-else`.

---

## v-if

Conditionally render an element or a template fragment based on truthy-ness of the expression value.

- Expect: `any`
- Details:
When a `v-if` element is toggled, the element and its contained directives / components destroyed and re-constructed. If the initial condition is falsy, then the inner content won't be rendered at all.

It can be used on `<template>` to denote a conditional block.

This directive trigger transitions when its condition changes.

> [!NOTE]
> When used together, `v-if` has a higher priority than `v-for`. Try not to used these together

---

## v-else

Denote the "else block" for `v-if` or a `v-if` / `v-else-if` chain.

**Does not expect expressions**

- Details:
- - Restriction: previous sibling element must have `v-if` or `v-else-if`.
- - Can be used on `<template>`

- Example:

```vue
<div v-if="Math.random() > 0.5">
    Now you can see me
</div>

<div v-else>
    Now you don't
</div>
```

---

## v-else-if

Denote the "else if block" for `v-if` and can be chained.

- Expect: `any`
- Details:
- - Restriction: previous sibling element must have `v-if` or `v-else-if`
- - Can be used on `<template>`

- Example:

```vue
<div v-if="type === 'A'">
    A
</div>
<div v-else-if="type === 'B'">
    B
</div>
<div v-else-if="type === 'C'">
    C
</div>
<div v-else>
    Not A/B/C
</div>
```

> [!NOTE]
> **`v-if` vs. `v-show`**
> `v-if` is a "real" conditional rendering because it ensures that event listeners and also child components inside the conditional block are properly destroyed and re-creating during the toggle.
> `v-if` is also **lazy**. Means that if the condition was false on initial rendering, it will notdo anything. The conditional block won't be rendered until the condition becomes true for the first time.
> In comparison, the `v-show` is much simpler. The element will always rendered regardless of initial condition, with CSS based toggling.
> Generally, the `v-if` has cost on toggling and also `v-show` has higher initial rendering cost. So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition in unlikely to change at runtime.

---

## v-for

Render the element or template block multiple times based on the source data.

- Expect: `Array | Object | Number | String | Iterable`

- Details:
The directive's value must use the special syntax `alias in expression` to provide an alias for the current element being iterated on:

```vue
<div v-for="item in items">
    {{ item.text }}
</div>
```

Alternatively, you can also specify an alias for the index (or the key if used on an Object):

```vue
<div v-for="(item, index) in items"></div>
<div v-for="(value, key) in object"></div>
<div v-for="(value, key, index) in object"></div>
```

The default behaviour of `v-for` will try to patch the elements in-place without moving them. To force it to reorder elements, you should provide an ordering hint using `key` special attribute

```vue
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

---

## v-on