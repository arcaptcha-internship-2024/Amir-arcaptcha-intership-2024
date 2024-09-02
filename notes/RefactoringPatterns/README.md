# Refactoring Patterns

Whenever we notice the bad smells in our code, we have to use **Refactoring Patterns** to refactor the code structure.
During this note we will be informed from some of refactoring methods.

## Source:

[Refactoring techniques](https://refactoring.guru/refactoring/techniques)

### Refactoring Techniques 

| Name | Notes |  Link |
| --- | --- |  --- |
| Simplifying Method Calls | [Go to section]() | [Link](https://refactoring.guru/refactoring/techniques/simplifying-method-calls) |

___

### 1. Simplify Method Calls

> [!NOTE]
> This technique will refactor the methods for better usage improve code readability and also **maintain**.
> This section will cover some refactoring techniques that are trying to refactor methods as well as they can.

##### - Rename method

| Problem | Solution |
| --- | --- |
| Method name doesn't explain what is method do | Rename the method |

###### Example: 

```js
const getCN = () => {...}

// Try to replace with: 

const getCustomerName = () => {...}
```

###### Why Refactoring:

Perhaps a method named in rush or the name at the beginning was true but as functionality grew, The name is not proper for what is method doing now.

###### How to refactor:

1. See where is method defined, you have to change all method names in everywhere that method is defined.

2. Create a new method with new name, then copy and pase all code from method you want to refactore it to your new method, Then delete all code from dead method and instead, call the new method in it's body.

3. Find all refrences to old method and then replace it with the new one.

4. Delete the old method from code. If the method is part of public interface, dont delete the method, instead, mark the method as **deprecated**.

---

##### - Add Parameter 

| Problem | Solution |
| --- | --- |
| method doesn't have enough data to perform certain action | Create a new parameter to pass the necessary data to method |

###### Example: 

```js
const getUserFactor = () => {...}

// Try to replace with: 

const getUserFactor = (userID) => {...}
```

###### Why Refactoring:

You need to make a change in method and these changes require adding information or data that was previously not available to the method.

###### Benefits:

The choice here is between **add a new parameter** and **add new private field** to contain necessary data needed for method. When the data that you want to pass into function is different every time, you can **add new parameter** and it is not optimal that you save it in a variable. Otherwise **adding a private field** and store data in a varibale is a optimal way to keep necessary data for function process.

###### Drawbacks:

Adding a new parameter always is easier than remove it from methods, but keep in mind that get only necessary data as a internal arguments. Otherwise, frequently you will have a extra large balloon of [Parameter lists](https://refactoring.guru/smells/long-parameter-list).

If you're handling this in a `class` probably this means that your class is not optimal and you wont keep the necessary data in your class. So try to fix this problem in hole class by moving data to main class or add important data or fields to keep necessary data in class privately.

###### How to refactor:

1. See where is method defined, you have to change all method names in everywhere that method is defined.

2. For keep your program functional during the refactor process, create a new method by copy the old one, and then add the parameter to this new method. Replace the hole body of old method by calling the new method in the old method body. You can also keep a default value for your new parameter such as `null` or `zero`, ... .

3. Find all refrences to old method and then replace it with the new one.

4. Delete the old method from code. If the method is part of public interface, dont delete the method, instead, mark the method as **deprecated**.

---

