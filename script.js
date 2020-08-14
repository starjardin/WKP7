//Steps create a collections of objects.
const books = [{
        title: "Harry Potter and the Philosopher Stone",
        author: "Jk Rolling",
        genre: "fantasy",
        pages: 323,
        read: false,
        id: 1597384168578,
    },
    {
        title: "pachicnko",
        author: "Min Jin Lee",
        genre: "fiction",
        pages: 400,
        reade: false,
        id: 1597384192030,
    },
    {
        title: "Educated",
        author: "Tara Westover",
        genre: "Memory",
        pages: 423,
        read: false,
        id: 597384226575,
    },
    {
        title: "Refactoring UI",
        author: "Adam wathan",
        genre: "Design",
        pages: 873,
        read: false,
        id: 1597384535343,
    },
];
console.log(books)
    //Create a html based on the collections.
    //Grab the element all eleements that are needed.
const container = document.querySelector('.container');
const formEl = container.querySelector(".form");
const submitBtn = formEl.querySelector(".btn");
const booksContainer = container.querySelector('.books-container');
const tabel = container.querySelector('.table');

//Hang I should generate the html first doing this an?
//how can I do that? 
//first map trough the books array and crate the html

let bookStore = [...books];

//Fucntion to generate the tabel header html for the books.
function generateBooksHeding() {
    const tabelHeadingHtml = `
    <thead class="table-head">
      <tr class="table-row">
        <th class="table-col">Title</th>
        <th class="table-col">author</th>
        <th class="table-col">Genre</th>
        <th class="table-col">Pages</th>
        <th class="table-col">Read</th>
      </tr>
      </thead>`
    tabel.insertAdjacentHTML("afterbegin", tabelHeadingHtml)
}

//function to generate the table body (book lists) for the books that are added.
function generateBooks() {
    const html = bookStore.map(book =>
        `<tbody class="table-body">
        <tr class="table-row">
          <td class="table-col">${book.title}</td>
          <td class="table-col">${book.author}</td>
          <td class="table-col">${book.genre}</td>
          <td class="table-col">${book.pages}</td>
          <td class="col">
            <input type="checkbox" name="read" id="read">
          </td>
          <td class="col">
            <button type="button" class="delete">delete</button>
          </td>
        </tr>
      </tbody>`
    ).join("");
    tabel.insertAdjacentHTML('afterbegin', html);
    formEl.dispatchEvent(new CustomEvent('booksUpdated'));
}

const booksHeading = generateBooksHeding();

//function that take the information from the form
let newBooks;
const handleFormData = (e, form) => {
    e.preventDefault();
    form = e.currentTarget;
    console.log(form)
    const { title, genre, pages, author } = form;
    // form.reset();
    newBooks = {
        title: title.value,
        genre: genre.value,
        author: author.value,
        pages: pages.value,
        read: false,
        id: Date.now(),
    };
    bookStore.push(newBooks);
    // container.dispatchEvent(new CustomEvent('booksUpdated'));
    formEl.addEventListener('booksUpdated', handleFormData);
};

//Add event listener to the form to sumbmit.
formEl.addEventListener('submit', handleFormData);
formEl.addEventListener('booksUpdated', handleFormData);
window.addEventListener('DOMContentLoaded', generateBooks);