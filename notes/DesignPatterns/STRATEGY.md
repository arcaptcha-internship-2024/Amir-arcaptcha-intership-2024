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