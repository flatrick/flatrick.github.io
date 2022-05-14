---
title: "Programming by Wishful Thinking"
creation date: 2022-05-14 15:57
draft: false
---

**Programming by Wishful Thinking** is a development-style where you design a library/class/method by writing code as if the library/class/method already exists.
The more conventional way of writing code would put emphasis on just making the code work before attempting to use it, which would require the developer to build a mental picture of the end-result before starting to write any code.  
The idea is that by writing test-code that uses what you're about to develop, you will end up with code that is easier to use.

*This style of development is a great way to do [[TDD]] and writing [[Unit Tests]].*  
*This style is also a variation of writing Top-Down programming.*

## Example

To give a simple and clear example, let's say we want to develop a inventory of books for a library.  
Before we even start to write a single line of code on our inventory-application, we'll begin by writing code that uses our still un-written code.  
I'll use [[xUnit]] and [[Fluent Assertions]] to write the **Wishful Thinking** code as  a unit test:

```c#
using FluentAssertions;
using Xunit;

namespace WishfulThinking.Tests
{
    public class LibraryTests
    {
        [Fact]
        void AddBookByCreatingBook()
        {
            // Arrange
            ILibrary _sut = new Library();
            // Act
            Action act = () => _sut.AddBook("1984", "George Orwell", "ISBN10", "ISBN13");
            // Assert
            act.Should().NotThrow();
        }
    }
}
```

Based on this test, we have now defined that we want to be able to add books to the library by inserting title, author and the book's ISBN10/13 identification number.  
And since coding against **Interfaces** gives us a lot more flexibility, we'll begin by creating one and adding our function **AddBook()** to it:

```c#
namespace WishfulThinking.Interfaces
{
    public interface ILibrary
    {
        public void AddBook(string title, string author, string ISBN10, string ISBN13);
    }
}
```

And now we can create as many concrete implementations for this functionality that we need, for example, we might need different ones if we're using a SQL-database or a NoSQL-database.  
To focus on the idea rather than this concrete implementation, I'll just store things in a `List<T>` and I'll just add a simple Entity-class for the books:
```C#
using System.Collections.Generic;

namespace WishfulThinking
{
    public class Library : ILibrary
    {
        private readonly List<Book> _books;
        public Library()
        {
            _books = new List<Book>();
        }

        public void AddBook(string title, string author, string ISBN10, string ISBN13)
        {
            _books.Add(new Book(title, author, ISBN10, ISBN13));
        }
    }

    public class Book
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN10 { get; set; }
        public string ISBN13 { get; set; }

        public Book(string title, string author, string ISBN10, string ISBN13)
        {
            this.Title = title;
            this.Author = author;
            this.ISBN10 = ISBN10;
            this.ISBN13 = ISBN13;
        }
    }
}
```

We have now implemented the first parts of the class **Library** by :

1. writing a test that expects it to behave in a certain way
2. then creating an Interface that matches the input and out
3. finally creating a concrete class that follows those expectations

In the example above, I wrote a single test that checks that the method doesn't throw any exceptions when I add a book, and it was intentionally kept simple.  
You could write more tests for more functionality before you start writing the actual implementation, but doing it one step at a time will make it easier to handle any unexpected dependencies.

And this is one simple way of doing [[TDD|Test Driven Development]] that should help you build functionality around how you want to work with the new function, rather than attempting to build a potentially complex model in your head before you've even written a single line of code.

# Sources
- [Wishful Thinking - C2 wiki](https://wiki.c2.com/?WishfulThinking)
- [Programming by Wishful Thinking - DSO Guy](http://dsoguy.blogspot.com/2007/01/programming-by-wishful-thinking.html)
- [What is Programming By Wishful Thinking? - Liam Norman](https://www.liamnorman.com/programming-by-wishful-thinking/)