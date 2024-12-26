import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import Countdown from "./components/Countdown";
import NextReview from "./components/NextReview";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewDate, setNewReviewDate] = useState("");

  const saveToLocalStorage = (updatedReviews) => {
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleAddReview = (name, reviewDate, flexibleInterval) => {
    const newReview = { name, reviewDate, flexibleInterval };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    saveToLocalStorage(updatedReviews);
  };

  const handleEditReview = (index, updatedReview) => {
    const updatedReviews = reviews.map((review, i) =>
      i === index ? { ...review, ...updatedReview } : review
    );
    setReviews(updatedReviews);
    saveToLocalStorage(updatedReviews);
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    saveToLocalStorage(updatedReviews);
  };

  const handleReorder = (result) => {
    if (!result.destination) return;

    const reorderedReviews = [...reviews];
    const [movedItem] = reorderedReviews.splice(result.source.index, 1);
    reorderedReviews.splice(result.destination.index, 0, movedItem);

    setReviews(reorderedReviews);
    saveToLocalStorage(reorderedReviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddReview(newReviewName, newReviewDate, 0); // Assuming flexibleInterval is 0 initially
    setNewReviewName("");
    setNewReviewDate("");
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Badge Review Scheduler
      </Typography>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              label="Review Name"
              value={newReviewName}
              onChange={(e) => setNewReviewName(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Review Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={newReviewDate}
              onChange={(e) => setNewReviewDate(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Review List */}
      <DragDropContext onDragEnd={handleReorder}>
        <Droppable droppableId="reviews">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {reviews.map((review, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        marginBottom: "15px",
                        padding: "15px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <CardContent>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="h6">{review.name}</Typography>
                            <Countdown reviewDate={review.reviewDate} />
                            <NextReview
                              reviewDate={review.reviewDate}
                              flexibleInterval={review.flexibleInterval}
                              onIntervalChange={(newInterval) =>
                                handleEditReview(index, { flexibleInterval: newInterval })
                              }
                            />
                          </Grid>
                          <Grid item xs={6} style={{ textAlign: "right" }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleEditReview(index, {
                                  name: prompt("Edit Review Name:", review.name) || review.name,
                                  reviewDate:
                                    prompt(
                                      "Edit Review Date (YYYY-MM-DD):",
                                      review.reviewDate
                                    ) || review.reviewDate,
                                })
                              }
                              style={{ marginRight: "10px" }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDeleteReview(index)}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default App;
