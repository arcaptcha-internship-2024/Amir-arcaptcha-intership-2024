# Directive

In VueJS, we do have an API named Directive, that used to bind variables to tags.
In this markown, we're gonna review what types are availabe in Vue Directive API and how and when to use them.

## v-text:

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

## v-html:

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

