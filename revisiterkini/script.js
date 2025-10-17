// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('book-form');
    const searchForm = document.getElementById('search-book-form');
    const incompleteList = document.getElementById('incomplete-books');
    const completeList = document.getElementById('complete-books');
    let searchTerm = ''; // Untuk filter pencarian
 
    // Load buku dari localStorage saat halaman dimuat
    loadBooks();
 
    // Event listener untuk form tambah buku
    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addBook();
    });

    // Event listener untuk form pencarian
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = document.getElementById('search-title').value.trim();
        searchTerm = searchInput;
        renderBooks(searchTerm);
    });
 
    // Fungsi untuk menambahkan buku baru
    function addBook() {
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const year = parseInt(document.getElementById('year').value);
        const isComplete = document.getElementById('isComplete').checked;
 
        if (!title || !author || isNaN(year) || year < 0) {
            alert('Mohon isi semua field dengan benar! Tahun harus berupa angka positif.');
            return;
        }
 
        const newBook = {
            id: Date.now(), // ID unik berdasarkan timestamp (number)
            title: title, // string
            author: author, // string
            year: year, // number
            isComplete: isComplete // boolean
        };
 
        // Ambil buku existing dari localStorage
        let books = JSON.parse(localStorage.getItem('BOOKSHELF_APP')) || [];
        books.push(newBook);
        localStorage.setItem('BOOKSHELF_APP', JSON.stringify(books));
 
        // Reset form
        bookForm.reset();
 
        // Render ulang daftar buku (dengan filter pencarian jika ada)
        renderBooks(searchTerm);
    }
 
    // Fungsi untuk memuat dan render buku
    function loadBooks() {
        renderBooks(searchTerm);
    }
 
    function renderBooks(filter = '') {
        const books = JSON.parse(localStorage.getItem('BOOKSHELF_APP')) || [];
 
        // Filter berdasarkan pencarian (judul)
        let filteredBooks = books;
        if (filter) {
            filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(filter.toLowerCase())
            );
        }
 
        // Filter buku incomplete dan complete
        const incompleteBooks = filteredBooks.filter(book => !book.isComplete);
        const completeBooks = filteredBooks.filter(book => book.isComplete);
 
        // Render incomplete
        incompleteList.innerHTML = '';
        incompleteBooks.forEach(book => {
            const div = createBookElement(book, true); // true = incomplete
            incompleteList.appendChild(div);
        });
 
        // Render complete
        completeList.innerHTML = '';
        completeBooks.forEach(book => {
            const div = createBookElement(book, false); // false = complete
            completeList.appendChild(div);
        });
    }
 
    // Fungsi untuk membuat elemen buku (<div>)
    function createBookElement(book, isIncomplete) {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.setAttribute('data-bookid', book.id);
        div.setAttribute('data-testid', 'bookItem');
 
        const details = document.createElement('div');
        details.className = 'book-details';
 
        const titleH3 = document.createElement('h3');
        titleH3.setAttribute('data-testid', 'bookItemTitle');
        titleH3.textContent = book.title;
 
        const authorP = document.createElement('p');
        authorP.setAttribute('data-testid', 'bookItemAuthor');
        authorP.textContent = `Penulis: ${book.author}`;
 
        const yearP = document.createElement('p');
        yearP.setAttribute('data-testid', 'bookItemYear');
        yearP.textContent = `Tahun: ${book.year}`;
 
        details.appendChild(titleH3);
        details.appendChild(authorP);
        details.appendChild(yearP);
 
        const actions = document.createElement('div');
        actions.className = 'book-actions';
 
        // Tombol ubah status
        const completeButton = document.createElement('button');
        completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        completeButton.textContent = isIncomplete ? 'Selesai dibaca' : 'Belum selesai dibaca';
        completeButton.addEventListener('click', () => moveBook(book.id));
 
        // Tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => deleteBook(book.id));
 
        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);
 
        div.appendChild(details);
        div.appendChild(actions);
 
        return div;
    }
 
    // Fungsi untuk memindahkan buku antar rak
    function moveBook(bookId) {
        let books = JSON.parse(localStorage.getItem('BOOKSHELF_APP')) || [];
        const bookIndex = books.findIndex(book => book.id === bookId);
        
        if (bookIndex !== -1) {
            books[bookIndex].isComplete = !books[bookIndex].isComplete; // Toggle status
            localStorage.setItem('BOOKSHELF_APP', JSON.stringify(books));
            renderBooks(searchTerm);
        }
    }
 
    // Fungsi untuk menghapus buku
    function deleteBook(bookId) {
        if (confirm('Yakin ingin menghapus buku ini?')) {
            let books = JSON.parse(localStorage.getItem('BOOKSHELF_APP')) || [];
            books = books.filter(book => book.id !== bookId);
            localStorage.setItem('BOOKSHELF_APP', JSON.stringify(books));
            renderBooks(searchTerm);
        }
    }
});