import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import QuestionSummary from "./QuestionSummary";

const QuestionList = ({ title, questions }) => {
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{title || "New Questions"}</Typography>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {questions.map((q) => (
          <Grid xs={2} key={q.id}>
            <QuestionSummary question={q} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default QuestionList;
