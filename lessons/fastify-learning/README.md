# Fastify

I'm willing to say that I'm starting to learn fastify.

### Course:

- [x] [Fastify Crash Course](https://www.youtube.com/watch?v=Lk-uVEVGxOA)
- [ ] [Fastify Crash Course](https://www.youtube.com/watch?v=btGtOue1oDA)

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

