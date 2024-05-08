import React, { useContext } from 'react';
import { SearchBook } from './SearchBook';
import { ListBook } from '../components/ListBook';
import { ShowSearchBookContext } from '../context/ShowSearchBook';

export const Home = () => {
  const { showSearchPage } = useContext(ShowSearchBookContext);

  return <>{showSearchPage ? <SearchBook /> : <ListBook />}</>;
};
