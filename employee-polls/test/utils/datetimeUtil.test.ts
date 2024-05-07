import moment from "moment";
import { formatQuestionTime } from "../../src/utils/datetimeUtil"; // Import the function to be tested

describe("formatQuestionTime", () => {
  test("format timestamp correctly", () => {
    const timestamp = 1617560672000;
    const formattedTime = formatQuestionTime(timestamp);
    expect(formattedTime).toBe("01:24:AM | 04:05:2021");
  });

  test("format today's timestamp correctly", () => {
    // Get the current date and time
    const today = moment();
    const timestamp = today.valueOf(); // Unix timestamp in milliseconds
    const formattedTime = formatQuestionTime(timestamp);

    const expectedFormat = today.format("hh:mm:A | MM:DD:YYYY");

    expect(formattedTime).toEqual(expectedFormat);
  });
});
