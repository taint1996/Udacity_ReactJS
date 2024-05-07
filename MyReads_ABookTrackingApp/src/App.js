import React from 'react'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ShowBook } from "./pages/ShowBook";
import { UpdateBook } from './pages/UpdateBook'
import { SearchBook } from './pages/SearchBook'

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<ShowBook />} />
        <Route path="/books/:id/update" element={<UpdateBook />} />
        <Route path="/search" element={<SearchBook />} />
			</Routes>
		</div>
	);
}

export default App;
