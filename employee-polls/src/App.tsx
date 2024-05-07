import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Loading from './components/Loading';
import Header from './components/Header';
import NotFound from './components/NotFound';

import { NewPoll } from './pages/NewPoll';
import PrivateRoute from './components/PrivateRoute';
import Leaderboard from './components/LeaderBoard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsersQuestionsData,
  login,
  logout,
  selectIsLoggedIn
} from './features/slice/auth/authSlice.ts';
import { AppDispatch } from './features/store';
import { fetchQuestions } from './features/slice/questions/questionsSlice.ts';
import { fetchUsers } from './features/slice/users/usersSlice.ts';

const Home = React.lazy(() => import('./pages/Home'));
const PollPage = React.lazy(() => import('./components/PollPage'));
const Login = React.lazy(() => import('./features/slice/auth/Login'));

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (userLoggedIn && user) {
      dispatch(login(user));

      dispatch(fetchQuestions());
      dispatch(fetchUsers());
      dispatch(getAllUsersQuestionsData());
    } else if (!userLoggedIn || !user || !storedUser) {
      dispatch(logout());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Leaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <NewPoll />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:questionId"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <PollPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
