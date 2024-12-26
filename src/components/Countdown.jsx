import React from "react";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

const Countdown = ({ reviewDate }) => {
  const today = dayjs();
  const targetDate = dayjs(reviewDate);
  const daysRemaining = targetDate.diff(today, "day");

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h6">Countdown</Typography>
      <Typography variant="body1">
        {daysRemaining > 0
          ? `${daysRemaining} days remaining until your review.`
          : "The review date has passed."}
      </Typography>
    </div>
  );
};

export default Countdown;
