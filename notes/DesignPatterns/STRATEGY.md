# Strategy Desing Pattern

## Sources:

| Source | Link |
| --- | --- |
| Strategy Algorithm | [Link](https://refactoring.guru/design-patterns/strategy) |

**Strategy** is a design pattern that let you seprate a family of algorithms, put each one if them in seprated classes and make their objects interchangeable.

In short, Strategy design pattern allow you to change the strategy or algorithm for a program as simple as possible, without modify the code that uses it.
You define the strategies and the client program will chooses the appropriate one at runtime.

The Strategy pattern suggest that you take a class that does something specific in lot of different ways and separate them into classes called strategies.

The original classes called **context** must have a field for storing a reference to one of the strategies. The context delegates the work to linked strategy object instead of doing it by its own.

> [!NOTE]
> The context is not responsible for selecting the appropriate strategy, instead, **the client** passes the desired strategy to the context. 
>
> In fact, the context doesn't much know about strategies!
>
> The context will work with all strategies with same interface, which only exposes a single method for triggering the algorithm encapsulated within the selected strategy.

#### PseudoCode

```
// The strategy interface declares operations common to all
// supported versions of some algorithm. The context uses this
// interface to call the algorithm defined by the concrete
// strategies.
interface Strategy is
    method execute(a, b)

// Concrete strategies implement the algorithm while following
// the base strategy interface. The interface makes them
// interchangeable in the context.
class ConcreteStrategyAdd implements Strategy is
    method execute(a, b) is
        return a + b

class ConcreteStrategySubtract implements Strategy is
    method execute(a, b) is
        return a - b

class ConcreteStrategyMultiply implements Strategy is
    method execute(a, b) is
        return a * b

// The context defines the interface of interest to clients.
class Context is
    // The context maintains a reference to one of the strategy
    // objects. The context doesn't know the concrete class of a
    // strategy. It should work with all strategies via the
    // strategy interface.
    private strategy: Strategy

    // Usually the context accepts a strategy through the
    // constructor, and also provides a setter so that the
    // strategy can be switched at runtime.
    method setStrategy(Strategy strategy) is
        this.strategy = strategy

    // The context delegates some work to the strategy object
    // instead of implementing multiple versions of the
    // algorithm on its own.
    method executeStrategy(int a, int b) is
        return strategy.execute(a, b)


// The client code picks a concrete strategy and passes it to
// the context. The client should be aware of the differences
// between strategies in order to make the right choice.
class ExampleApplication is
    method main() is
        Create context object.

        Read first number.
        Read last number.
        Read the desired action from user input.

        if (action == addition) then
            context.setStrategy(new ConcreteStrategyAdd())

        if (action == subtraction) then
            context.setStrategy(new ConcreteStrategySubtract())

        if (action == multiplication) then
            context.setStrategy(new ConcreteStrategyMultiply())

        result = context.executeStrategy(First number, Second number)

        Print result.
```

## Example:
For better understanding, I bring an example in **Python** language:

#### Problem:

Imagine that you have a payment program that users can choose different ways for pay the money, and each payment has it's own way to process payment.

#### Solution:

You can define an **abstract** class that have all methods for same strategies, and then create your payment **strategies**. Them use your strategies in your **context** class.

```python
from abc import ABC, abstractmethod

# Define an abstract method for all strategies
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

# Define different strategies for payment
class PayPalPayment(PaymentStrategy):
    def __init__(self, email: str):
        self.email = email

    def pay(self, amount):
        print(f"Pay {amount} using PayPal")

class CreditCardPayment(PaymentStrategy):
    def __init__(self, credit_card: str):
        self.credit_card = credit_card

    def pay(self, amount):
        print(f"Pay {amount} using Creadit Card")

class BitCoinPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Pay {amount} using BTC")
    

# Define context class
class PaymentContext:
    def __init__(self, payment_strategy: PaymentStrategy):
        self._payment_strategy = payment_strategy
    
    def set_payment_strategy(self, strategy: PaymentStrategy):
        self._payment_strategy = strategy
    
    def checkout(self, amount):
        self._payment_strategy.pay(amount)
```