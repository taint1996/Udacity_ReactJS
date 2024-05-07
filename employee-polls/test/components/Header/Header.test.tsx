import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from '../../../src/components/Header';
import { logout } from '../../../src/features/slice/auth/authSlice';

const mockStore = configureStore([]);

describe('Header', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: true,
        user: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: '/assets/images/snow.jpg',
        },
      },
    });
  });

  test('renders Home link correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('dispatches logout action on clicking the Logout button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(logout());
  });
});