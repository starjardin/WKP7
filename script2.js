//An array collection of objects
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
        read: false,
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
const booksContainer = container.querySelector('.books-container');
const tableHead = container.querySelector('.table-head');
const tableBody = container.querySelector('.table-body');
const table = document.querySelector('table');

function generateBooksHeding() {
    const tabelHeadingHtml = `
      <tr class="table-row">
        <th class="table-col">Title</th>
        <th class="table-col">author</th>
        <th class="table-col">Genre</th>
        <th class="table-col">Pages</th>
        <th class="table-col">Read</th>
      </tr>
      </thead>`
    tableHead.innerHTML = tabelHeadingHtml;
};

//Handle submit button
let bookStorage = [...books];
const handleSubmitData = (e) => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const genre = form.genre.value;
  const author = form.author.value;
  const pages = form.pages.value;
  const newBooks = {
    title,
    author,
    genre,
    pages,
    id: Date.now(),
    read: false,
  };
  bookStorage.push(newBooks);
  const html = bookStorage.map(book => 
    `<tr class="table-row">
      <td class="table-col">${book.title}</td>
      <td class="table-col">${book.author}</td>
      <td class="table-col">${book.genre}</td>
      <td class="table-col">${book.pages}</td>
      <td class="col">
        <input type="checkbox" name="read" id="read">
      </td>
      <td class="col">
        <button 
          type="button"
          class="delete"
          value=${book.id}
        >delete</button>
      </td>
    </tr>`).join('');
    tableBody.innerHTML = html;
  e.target.reset();
  //Custom event, that will launch the event whenever it should be.
  formEl.dispatchEvent(new CustomEvent('booksUpdated'));
};

const generateBookLists = () => {
  const html = bookStorage.map(book => 
    `<tr class="table-row">
      <td class="table-col">${book.title}</td>
      <td class="table-col">${book.author}</td>
      <td class="table-col">${book.genre}</td>
      <td class="table-col">${book.pages}</td>
      <td class="col">
        <input type="checkbox" name="read" id="read">
      </td>
      <td class="col">
        <button 
          type="button"
          class="delete"
          value=${book.id}
        >delete</button>
      </td>
    </tr>`).join('');
    tableBody.innerHTML = html;
};

const mirrorToLocalStorage = () => {
  //This will tranform the array of objects into string and store it to the local storage
  localStorage.setItem('bookStorage', JSON.stringify(bookStorage));
};

const restoreFromLocalStorage = () => {
  //This will remember your data when you refresh your page
  const listOfBooks = JSON.parse(localStorage.getItem('bookStorage'));
  //Whatever length your array have, that will be the inner html
  if (listOfBooks.length) {
    bookStorage.push(...listOfBooks);
    console.log(listOfBooks.length);
  };
  formEl.dispatchEvent(new CustomEvent('booksUpdated'));
};

const booksHeading = generateBooksHeding();
const booksContent = generateBookLists();

//Deleting books
const deleteBooks = (id) => {
  //Filter the bookStorage and the left will be your list (the ones which did not have clicked)
  bookStorage = bookStorage.filter(book => book.id !== id);
  console.log(bookStorage);
  //Custom event
  formEl.dispatchEvent(new CustomEvent('booksUpdated'));
};

//Evnet listener to delete the button onece it get clicked.
tableBody.addEventListener('click', (e) => {
  id = Number(e.target.value);
  console.log(id);
  if (e.target.matches('.delete')) {
    deleteBooks(id);
  };
});

//Add event listener here
formEl.addEventListener("submit", handleSubmitData);
formEl.addEventListener('booksUpdated', generateBookLists);
formEl.addEventListener('booksUpdated', mirrorToLocalStorage);
restoreFromLocalStorage();