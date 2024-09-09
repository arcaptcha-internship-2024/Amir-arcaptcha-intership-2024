# Fastify

I'm willing to say that I'm starting to learn fastify.

### Course:

- [x] [Fastify Crash Course](https://www.youtube.com/watch?v=Lk-uVEVGxOA)
- [x] [Fastify Crash Course](https://www.youtube.com/watch?v=btGtOue1oDA)

# Notes:

#### fastify.route()

In fastify, You can use fastify.route() instead of fastify.get() or [fastify.post(), ...] .
This is one of the common ways to write route for application:

Example:

```js
fastify.route({
    method: "GET",
    url: "/api/your-path/:name",
    schema: {
        // Your schema will define here:
        
    },
    handler: yourAPIHandler(request, response)
});
```

#### JSON schema validation

JSON Schema in fastify is desined for data valdation, by this example we will be more familiar with this ability:

```js
const schemaValidation = {
    schema:{
        queryString:{
            // Validate QueryString here
            properties: {
                lastName: { type: "string" }
            },
            required: [ 'lastName' ],
        },
        params: {
            // Validate url parameter here

            properties: {
                firstName: { type: "string" }, 
            },
            // Required here is not necessary because you defined it in url, if not defined in url, you can set in here:
            required: [ 'firstName' ]
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                },
                // You can set required in here
                required: ['message']
            }
        }
    },
    handler: (request, response) => {
        // You can return just an object instead of response.send()

        return {
            // You can access to parameters from request.params object
            // You can access to queryStrings from request.query object

            message: `Hello ${request.params.firstName} ${request.query.lastName}`
        }
    }
}
```

#### fastify.register()

For register your routes to fastify, you can set a **prefix** option that says all routes should start with that prefix to handle by given controllers.

In Example below, all urls that has the `/api` prefix will handle by controller:

```js
fastify.register(controller, { prefix: "/api" })
```

##### Hooks

Fastfy as a framework have a lifecycle for handle and process request and response. Hooks are lifecycle events that happen at the moment of request or response reach the point during the process. Hooks are useful for things like logging, authentication, etc.

Hooks registered with **fastify.addHook()** method and allow you to listen to  specified events in the application or request/response lifecycle. 

**You have to register a hook before the event in triggered, otherwise, the event is lost.**

> [!WARNING]
> the `done()` function is not for `async/await` or when a function return a `Promise`. If use in this case, unexpected behavior may occure.

**Example:**

```js
fastify.addHook("onRequest", (request, response, done) => {
    // Some Code Here

    // terminate the hook at end:
    done();
})
```

> [!NOTE]
> The `done()` method, is a function to continue the lifecycle and terminate or finish the hook.

> [!TIP]
> Hooks can be applied to selected routes by **Scopes**.

#### Request/Response Lifecycle in Fastify:

> [!NOTE]
> 4**/5** means that you can response a status code of 400 types or 500 type.
> For example: 400 as Bad Request.

```
Incoming Request
  │
  └─▶ Routing
        │
        └─▶ Instance Logger
             │
   4**/5** ◀─┴─▶ onRequest Hook
                  │
        4**/5** ◀─┴─▶ preParsing Hook
                        │
              4**/5** ◀─┴─▶ Parsing
                             │
                   4**/5** ◀─┴─▶ preValidation Hook
                                  │
                            400 ◀─┴─▶ Validation
                                        │
                              4**/5** ◀─┴─▶ preHandler Hook
                                              │
                                    4**/5** ◀─┴─▶ User Handler
                                                    │
                                                    └─▶ Reply
                                                          │
                                                4**/5** ◀─┴─▶ preSerialization Hook
                                                                │
                                                                └─▶ onSend Hook
                                                                      │
                                                            4**/5** ◀─┴─▶ Outgoing Response
                                                                            │
                                                                            └─▶ onResponse Hook
```

**Example:**

```js
// NOTE: this example is not correct, and it is just for show the wrong case

fastify.addHook("preHandler", (request, response, done) => {
    request.user = "John Doe";
    done();
})

fastify.get("/greeting", (request, response)=> {
    return {
        message: `Hello ${request.user}`
    }
})
```

The Example above is not correct because in fastify, when you want to add some parameter into request, response object, you have to use `decorators` to define it correct!

> [!NOTE]
> The example above is comprehensive in Fastify, you can add `user` information for better process in handlers.

#### Decorators:

**The decorators allows customization of Fastify core objects**.
such as the **server instance** and also **request/response** objects during the HTTP request lifecycle.

The decorators API can use to attach any type of property to the core object: (string, functions, native objects).

```js
// True form of attach a property to request object

fastify.derorateRequest('user', '');

fastify.addHook("preHandler", (request, response, done) => {
    request.user = "John Doe";
    done();
})

fastify.get("/greeting", (request, response)=> {
    return {
        message: `Hello ${request.user}`
    }
})
```

> [!NOTE]
> Decorators in Fastify are `synchronous`. For using in asynchronous you have to use `fastify-plugin`.

**Benefits:**

- Optimize handling of server, request, response object

> [!IMPORTANT]
> You have to keep the initial decorated field as close as possible to the result. For instance, initialize a decorator with an empty string `''` shows that the value is going to be string. Also you have to define `null` for a decorator that is going to be a `object or function`.

#### Fastify Hooks Scopes:

Fastify hooks are defined in 3 scope:

1. Global Scope
2. Plugin-Level Scope
3. Route-Level Scope

All we have code hooks until here in this document, was global scope, means that the hook will apply to every path we define, but for 2 other scope, we can encapsulate the hooks, to specified for a group of routes or even for just one route.

#### Plugin Level Scope

**Example:**

```js
const routeController = (fastify, option, done) => {
    fastify.addHook("preHandler", (request, response, done) => {
        // Your code here
        done();
    })

    fastify.get("/", (request, response) => {
        return {
            message: "Hello World!"
        }
    })
}

fastify.register(routeController);
fastify.get("/users", (request, response) => { ... });
```

In example above, the `preHandler` Hook will apply to `/` route not for `/users` route, because we have defined in a plugin and then register that plugin.
This is how we define a hook for plugin level scope.

#### Route Level Scope

```js
const userSchema = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                }
            }
        }
    },
    onRequest: (request, response, done) => {
        // On request handler here
        ...
    },

    preHandler: (request, reponse, done) => {
        // Pre handler hook here
        ...
    },

    handler: (request, response) => {
        // Handler function here
        ...
    }
}

fastify.get("/:user", userSchema)
```

In example above we have define 2 different hook for special route, and the hooks will apply for specified route. 
It is obvious that you can pass the schema to different routes!

> [!CAUTION]
> You can't use `onClose` hook in Plugin Level or Route level because this hook is not encapsulated.
> Sometimes you want to access elements defined in hooks in handler by `this` object. remember that this is not available in `arrow functions`.
