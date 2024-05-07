import React from "react";

export const Select = ({ showSearchPage, onHandleChangeSelectShelf, book }) => {
	const renderSelectTemplate = () => {
		const optionTextDisable =
			showSearchPage !== false ? "Add to..." : "Move to...";

		const selectTag = (
			<select
				onChange={(e) => onHandleChangeSelectShelf(e.target.value, book)}
				defaultValue={book.shelf ?? ''}
			>
				<option value="none" disabled>
					{optionTextDisable}
				</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				{showSearchPage === false && <option value="none">None</option>}
			</select>
		);

		return selectTag;
	};
	return <>{renderSelectTemplate()};</>;
};
