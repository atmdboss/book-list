class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    addToList(book){
        const tbody = document.getElementById("tbody"),
              bookToAdd = document.createElement("tr");
        bookToAdd.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class="delete">X</a></td>
        `;
        tbody.appendChild(bookToAdd);
        return this;
    }
    clearInput(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
        return this;
    }
    showAlert(msg, className){
        const div = document.createElement("div"),
              container = document.querySelector(".container"),
              h1 = document.querySelector("h1");
        div.className = `display ${className}`;
        div.textContent = msg;
        container.insertBefore(div, h1);
        setTimeout(function(){
            div.style.display = "none";
        }, 3000);
        return this;
    }
    addToLocalStorage(book){
        let booksArr;
        localStorage.getItem("books") === null ? booksArr = [] : booksArr = JSON.parse(localStorage.getItem("books"));
        booksArr.push(book);
        localStorage.setItem("books", JSON.stringify(booksArr));
        return this;
    }
    removeFromLocalStorage(isbn){
        let booksArr;
        booksArr = JSON.parse(localStorage.getItem("books"));
        booksArr.forEach(function(bookObj, index){
            if(bookObj.isbn === isbn){
                booksArr.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(booksArr));
        return this;
    }
}
//
//EVENT LISTENERS
//
document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("isbn").value,
          ui = new UI();
          //had to create an instance of the ui object to use it's function to add book object properties to list;
          const newBook = new Book(title, author, isbn);

    if(title === "" || author === "" || isbn === ""){
        ui.showAlert("You've got to input something", "error");
    } else {
        ui.addToList(newBook).clearInput().showAlert("Book added to list","success").addToLocalStorage(newBook);
    }
});


document.addEventListener("click", function(e){
    if(e.target.className === "delete"){
        const ui = new UI;
        e.target.parentNode.parentNode.remove();
        ui.showAlert("Book removed from list", "added").removeFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);
    }
});


document.addEventListener("DOMContentLoaded", function(e){
    if(localStorage.getItem("books") !== null){
        const ui = new UI;
        let booksArr = JSON.parse(localStorage.getItem("books"));
        booksArr.forEach(function(bookObj){
            ui.addToList(bookObj);
        });
        localStorage.setItem("books", JSON.stringify(booksArr));
    }
});