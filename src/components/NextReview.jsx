import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import dayjs from "dayjs";

const NextReview = ({ reviewDate, flexibleInterval, onIntervalChange }) => {
  const [customInterval, setCustomInterval] = useState(flexibleInterval);

  const calculateNextReview = () => {
    let nextReviewDate = dayjs(reviewDate);
    let addedDays = 0;

    while (addedDays < customInterval) {
      nextReviewDate = nextReviewDate.add(1, "day");
      if (nextReviewDate.day() !== 0) addedDays++; // Skip Sundays
    }

    return nextReviewDate.format("YYYY-MM-DD");
  };

  const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.target.value, 10);
    setCustomInterval(newInterval);
    onIntervalChange(newInterval);
  };

  return (
    <div>
      <Typography variant="h6">Next Review</Typography>
      <Typography variant="body1">
        Next Review Date: {calculateNextReview()}
      </Typography>
      <TextField
        label="Set Interval (days)"
        type="number"
        value={customInterval}
        onChange={handleIntervalChange}
        style={{ marginTop: "10px" }}
        fullWidth
      />
    </div>
  );
};

export default NextReview;
