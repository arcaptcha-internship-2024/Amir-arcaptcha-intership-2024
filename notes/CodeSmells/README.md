# Code Smells

In this note, we're going to figure out whats are code smells and how to remove them or prevent ourself not to do them.

Code Smells are some noticable hints that show the code in not maintainable or qualified.

Code Smells separated in different groups that we want to take a look at them:

### Change Preventers

These smells means that if you want to change something in your code, you've to make change in many part of the code too. Program development and maintenance become more difficult.

The **Change Preventers** are:

- #### Divergent Change

**Sign:**

You find yourself having to change many unrelated methods whenever you make changes to a class or part of code.

**Reason For the Problem:**

Poor progrqamming structure and copy paste programming

**Treatment:**

1. Split the behaviour of the class with extract classes into different classes that unrelated methods and also related features become group together.
2. If classes have the same behaviour use inheritance for classes with `super class` and `sub class`.

**PayOff:**

1. Improve code organization
2. Reduce code duplication
3. Simplifies support

___

- #### Shotgun surgery

**Sign:**

Make a change in code, require to make some changes in unrelated classes

**Reason For the Problem:**

A single responsibility has splitted in many classes or many methods.
Also this can happen after `Dirvergent change` if you didn't split code correctly.

**Treatment:**

1. Try to move related methods and fields into a single class using **Move Method** and **Move Field**. If there is no class, create a new one.
2. If moving methods and fields from class to another class leaves the class almost empty, try to get rid of the class and have a single class.

**PayOff:**

1. Improve code organization
2. Reduce code duplication
3. Easier maintenace

> [!NOTE]
> The `Shotgun Surgery` and `Dirvegent change` have the same behaviour, but in opposite side.
> In `Divergent change` the solution was to split classes and methods.
> In `Shotgun Surgery` the solution is to combine classes and methods.

___

- #### Parallel Inheritance Hierarchies

**Sign:**

This Issue occur whenever you're using `OOP`. You create a subclass from a class and you need to create a subclass from another class. This issue is for a situation that you've more than 2 classes and these classes are parallelly working together.


**Example:**

Parallel Inheritance Hierarchies typically arise when a system is designed with multiple domains that need to interact closely. For example, you might have a class hierarchy for handling different types of documents and another for handling various types of renderers. If each document type requires a specific renderer, you might end up creating a parallel class for each document type within the renderer hierarchy.

**Reason For the Problem:**

When the scale is small, everything works well but by developing the scale of project, handle and manage the hierarchies become more and more difficult.

**Treatment:**

1. Try to use composition instead of inheritance: Try to combine two or more different classes into a single class for manage better and have more focus on what's happening on the code

**PayOff:**

1. Reduce code duplication
2. Can improve organization of code

**When to ignore:**

When combine the classes into a single class and de-duplicate code, make code even harder for maintain, try to not fix this smell.

___

