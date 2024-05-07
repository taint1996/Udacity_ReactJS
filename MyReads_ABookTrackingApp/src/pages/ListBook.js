import React, { useState, useEffect } from "react";
import { getAll, update } from "../BooksAPI";
import { Link } from "react-router-dom";
import { BookList } from "../components/home/BookList";

export const ListBook = ({ onHandleSearchBook, showSearchPage }) => {
	const [books, setBooks] = useState([]);
	const BOOK_SHELF_LIST = ["Currently Reading", "Want To Read", "Read"];

	useEffect(() => {
		getAllBooks();
	}, [showSearchPage]);

	const getAllBooks = async () => {
		try {
			const getAllBooks = await getAll();
			setBooks(getAllBooks);
		} catch (e) {
			console.log(`Error when get all books ${e}`);
		}
	};

	const shelfBooks = (shelf) => {
		if (books) {
			return books.filter(
				(book) =>
					book.shelf.toLowerCase() === shelf.toLowerCase().replace(/\s+/g, "")
			);
		}
		return shelf;
	};

	const handleChangeSelectShelf = async (opt, book) => {
		try {
			const updateShelf = await update(book, opt);
			book.shelf = opt;
			setBooks([...books]);

			return updateShelf;
		} catch (e) {
			console.log(`Error when change select shelf ${e}`);
		}
	};

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{BOOK_SHELF_LIST.map((shelf, shelfIdx) => {
						return (
							<div className="bookshelf" key={`shelf-${shelfIdx}`}>
								<h2 className="bookshelf-title">{shelf}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										<BookList
											books={shelfBooks(shelf)}
											onHandleChangeSelectShelf={handleChangeSelectShelf}
											showSearchPage={showSearchPage}
										/>
									</ol>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="open-search">
				<Link to="/search" onClick={onHandleSearchBook}>
					add a book
				</Link>
			</div>
		</div>
	);
};
