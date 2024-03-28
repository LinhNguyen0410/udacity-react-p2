import { useSelector } from "react-redux";
import { selectAuthUser } from "../authUser/authUserSlice";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { Unstable_Grid2 as Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const AnsweredQuestion = ({ questionId }) => {
  const questions = useSelector((state) => state.questions.data);
  const question = questions[questionId];
  const authedUser = useSelector(selectAuthUser);
  const users = useSelector((state) => state.users.data);
  const author = users[question.author];

  let selectedOptionTxt = "You selected ";
  let selectedOption = 0;
  const oneVotes = question["optionOne"].votes.length;
  const twoVotes = question["optionTwo"].votes.length;
  const totalVotes = oneVotes + twoVotes;
  const onePercentage = ((100 * oneVotes) / totalVotes).toFixed(2);
  const twoPercentage = ((100 * twoVotes) / totalVotes).toFixed(2);

  if (question["optionOne"].votes.indexOf(authedUser.id) > -1) {
    selectedOptionTxt = `${selectedOptionTxt} first option`;
    selectedOption = 1;
  } else if (question["optionTwo"].votes.indexOf(authedUser.id) > -1) {
    selectedOptionTxt = `${selectedOptionTxt} second option`;
    selectedOption = 2;
  }

  const prepareReplies = () => {
    const data = [];
    question["optionOne"].votes.forEach((userId) => {
      const user = users[userId];
      data.push({ one: user, two: null });
    });
    question["optionTwo"].votes.forEach((userId) => {
      const user = users[userId];
      data.push({ one: null, two: user });
    });
    return data;
  };

  const ItemOne = ({ row }) => {
    if (row.one !== null)
      return (
        <Stack direction={"row"}>
          <Avatar src={row.one.avatarURL} />
          <span>{row.one.name}</span>
        </Stack>
      );
  };

  const ItemTwo = ({ row }) => {
    if (row.two !== null)
      return (
        <Stack direction={"row"}>
          <Avatar src={row.two.avatarURL} /> <span>{row.two.name}</span>
        </Stack>
      );
  };

  const Replies = () => {
    const data = prepareReplies();
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell>First Option selected by</TableCell>
              <TableCell>Second Option selected by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <ItemOne row={row} />
                </TableCell>
                <TableCell>
                  <ItemTwo row={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography variant="h4">Poll By {author.name}</Typography>
            <Avatar src={author.avatarURL} sx={{ width: 64, height: 64, bgcolor: "#ffc400", mr: "10px" }} />
          </Box>
          <Typography variant="h4">Would You Rather</Typography>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Stack>
          <TextField
            id="optionOne"
            label="First Option"
            variant="outlined"
            value={question["optionOne"]["text"]}
            InputProps={
              selectedOption === 1
                ? {
                    startAdornment: <InputAdornment position="start">✔</InputAdornment>,
                  }
                : {}
            }
            disabled={true}
          />
          <Typography variant="h6">{oneVotes} person(s) selected this option</Typography>
          <Typography variant="h6">
            {onePercentage} % of total {totalVotes} votes selected this option
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Stack>
          <TextField
            id="optionTwo"
            label="Second Option"
            variant="outlined"
            value={question["optionTwo"]["text"]}
            disabled={true}
            InputProps={
              selectedOption === 2
                ? {
                    startAdornment: <InputAdornment position="start">✔</InputAdornment>,
                  }
                : {}
            }
          />
          <Typography variant="h6">{twoVotes} person(s) selected this option</Typography>
          <Typography variant="h6">
            {twoPercentage} % of total {totalVotes} votes selected this option
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h4">{selectedOptionTxt}</Typography>
        </Box>
      </Grid>
      <Grid xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Replies />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AnsweredQuestion;
