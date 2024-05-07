import moment from "moment";

export const formatQuestionTime = (timestamp: number) => {
  return moment(timestamp).format("hh:mm:A | MM:DD:YYYY");
};
