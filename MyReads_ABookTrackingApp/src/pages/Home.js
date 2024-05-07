import React from "react";
import { useState } from "react";
import { SearchBook } from "./SearchBook";
import { ListBook } from "./ListBook";

export const Home = () => {
	const [showSearchPage, setShowSearchPage] = useState(false);

	const onHandleSearchBook = () => {
		setShowSearchPage(!showSearchPage);
		return
	};

	return (
		<>
			{showSearchPage ? (
				<SearchBook
					onHandleSearchBook={onHandleSearchBook}
					showSearchPage={showSearchPage}
				/>
			) : (
				<ListBook
					onHandleSearchBook={onHandleSearchBook}
					showSearchPage={showSearchPage}
				/>
			)}
		</>
	);
};
