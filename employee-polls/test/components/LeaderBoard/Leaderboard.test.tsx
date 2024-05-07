import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Leaderboard from "../../../src/components/LeaderBoard";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore([]);

describe("Leaderboard", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      users: {
        users: [],
        loading: false,
        error: null,
      },
      auth: {
        isLoggedIn: true,
        user: {
          id: "sarahedo",
          name: "Sarah Edo",
          avatarURL: "/assets/images/snow.jpg",
        },
      },
    });
  });

  test("snapShot Leaderboard page when rendered", async () => {
    const container = render(
      <Provider store={store}>
        <Router>
          <Leaderboard />
        </Router>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
