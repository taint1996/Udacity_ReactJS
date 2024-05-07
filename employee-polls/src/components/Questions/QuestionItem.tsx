import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import { Question } from "../../features/models/Question";
import { Button, CardActions } from "@mui/material";
import { formatQuestionTime } from "../../utils/datetimeUtil";

export default function QuestionItem({
  question,
  author,
  onHandleShowQuestion,
}: {
  question: Question;
  author: string;
  onHandleShowQuestion: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <>
      <Card sx={{ marginBottom: "16px" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <h3 style={{ margin: "0"}}>{author ? `${author}` : ""}</h3>
          <span style={{ color: "gray", fontSize: "small", margin: "0" }}>
            {formatQuestionTime(question?.timestamp)}
          </span>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="success"
            fullWidth
            onClick={onHandleShowQuestion}
          >
            Show
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
