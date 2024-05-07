import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search, update } from "../BooksAPI";
import { BookList } from "../components/home/BookList";

export const SearchBook = ({ onHandleSearchBook, showSearchPage }) => {
	const [searchText, setSearchText] = useState("");
	const [searchBooks, setSearchBooks] = useState([]);

	useEffect(() => {
		if (searchText) {
			handleSearchBook();
		}
	}, [searchText]);

	const handleSearchBook = async () => {
		const resultSearch = await search(searchText);
		const matchCondition = searchText.length > 0 && Array.isArray(resultSearch);

		const result = matchCondition
			? resultSearch.filter((res) => {
					return (
						res.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
						res.authors
							.join(", ")
							.toLowerCase()
							.indexOf(searchText.toLowerCase()) !== -1
					);
			  })
			: [];

		setSearchBooks(result);
		return result;
	};

	const handleChangeSelectShelf = async (opt, book) => {
		try {
			book.shelf = opt;
			const updateShelf = await update(book, opt);
			return updateShelf;
		} catch (e) {
			console.log(`Error when change select shelf ${e}`);
		}
	};

	const renderSearchBooks = (searchBooks) => {
		return (
			searchBooks &&
			searchText.length > 0 && (
				<>
					<BookList
						books={searchBooks}
						showSearchPage={showSearchPage}
						onHandleChangeSelectShelf={handleChangeSelectShelf}
					/>
				</>
			)
		);
	};

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/" onClick={onHandleSearchBook} className="close-search">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						value={searchText}
						placeholder="Search by title, author, or ISBN"
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">{renderSearchBooks(searchBooks)}</ol>
			</div>
		</div>
	);
};
