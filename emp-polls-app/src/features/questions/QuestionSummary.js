import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useNavigate, useLocation } from "react-router-dom";

const QuestionSummary = ({ question }) => {
  const navigateToQuestion = useNavigate();
  const currentLocation = useLocation();

  const handleClick = (event) => {
    event.preventDefault();
    navigateToQuestion(`/questions/${question.id}`, {
      state: { previousPath: currentLocation.pathname },
    });
  };

  const formatTime = () => {
    const date = new Date(question.timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = () => {
    const date = new Date(question.timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const details = [
    { icon: <PermIdentityIcon />, data: question.author },
    { icon: <DateRangeIcon />, data: formatDate() },
    { icon: <AccessAlarmsIcon />, data: formatTime() },
  ];

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {details.map((detail, index) => (
        <Typography key={index} component="h6" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {detail.icon} <span>{detail.data}</span>
        </Typography>
      ))}
      <Button onClick={handleClick} variant="contained" sx={{ mt: 3, mb: 2 }}>
        show
      </Button>
    </Box>
  );
};

export default QuestionSummary;
