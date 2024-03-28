import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "../users/usersSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Stack } from "@mui/material";
import sortLeaderboardDescending from "./leaderboard-sort";

const Leaderboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.users.data);
  const userIds = Object.keys(usersData);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchAllUsersAsync());
      setIsLoaded(true);
    }
  }, [isLoaded, dispatch]);

  const prepareData = () => {
    let data = [];
    userIds.forEach((id) => {
      let user = usersData[id];
      data.push({
        user,
        answered: Object.keys(user.answers).length,
        created: user.questions.length,
      });
    });
    return data;
  };

  const sortedData = prepareData().sort(sortLeaderboardDescending);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="right">Answered</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.user.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Stack direction={"row"}>
                  <Avatar src={row.user.avatarURL} />
                  <span>{row.user.name}</span>
                </Stack>
              </TableCell>
              <TableCell align="right">{row.answered}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
