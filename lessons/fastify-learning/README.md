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