import React, { useEffect, useState } from "react";
// import { postAPI } from './api'; // Import your API function for posting feedback
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAPI, deleteAPI, editAPI, getAPI } from "../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome icons
// import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import html2pdf from "html2pdf.js";

const FeedbackForm = () => {
  const generatePDF = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      html2pdf(element);
    } else {
      console.error(`Element with id ${elementId} not found.`);
    }
  };

  const [rating, setRating] = useState(0); // Initial rating state
  const [feedback, setFeedback] = useState("");
  const [UserId, setUserId] = useState("");
  const [SelectUserId, setSelectUserId] = useState("");
  const [Allfeedback, setAllFeedback] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);

  // Function to handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Function to handle feedback change
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const handleSubmitAPI = async (object, edit) => {
    const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
    let userID = userDataString._id || "NOID";

    const customerId = userID; // Your customerId value
    console.log(customerId);
    const obj = { ...object, customerId };
    console.log(obj);
    try {
      setSubmitting(true);
      if (edit) {
        editAPI("feedback/" + SelectUserId, obj)
          .then((resp) => {
            toast.success("Updated Added!");
            getAllFeedback();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      } else {
        addAPI("feedback", obj)
          .then((resp) => {
            toast.success("Successfully Added!");
            getAllFeedback();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("somthing went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate rating and feedback before submission
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    if (feedback.trim() === "") {
      toast.error("Please provide feedback.");
      return;
    }
    let obj = {
      feedback: feedback,
      rating: rating,
    };
    handleSubmitAPI(obj, edit);
    // Call API to submit feedback
    // try {
    //   setSubmitting(true);
    //   await postAPI('/feedback', { rating, feedback });
    //   toast.success('Feedback submitted successfully!');
    //   // Clear form after successful submission
    //   setRating(0);
    //   setFeedback('');
    // } catch (error) {
    //   console.error('Error submitting feedback:', error);
    //   toast.error('An error occurred while submitting feedback. Please try again later.');
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const getAllFeedback = () => {
    const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
    let userID = userDataString._id || "NOID";

    const customerId = userID; // Your customerId value
    console.log(customerId);
    if (customerId) {
      setUserId(customerId);
      try {
        getAPI("feedback")
          .then((resp) => {
            let sample = [];
            sample = resp.data;

            setAllFeedback(resp.data);
          })
          .catch((err) => setAllFeedback([]));
      } catch (error) {
        setAllFeedback([]);
      }
    }
  };
  useEffect(() => {
    getAllFeedback();
  }, []);
  const handleItemClick = (feedback) => {
    // Set form data with the clicked feedback item
    const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
    let userID = userDataString._id || "NOID";

    const customerId = userID; // Your customerId value
    console.log(feedback, "feedback");
    if (feedback.customerId) {
      if (customerId === feedback.customerId._id) {
        setSelectUserId(feedback._id);
        setRating(feedback.rating);
        setFeedback(feedback.feedback);
        setEdit(true);
      } else {
        console.log("jiji", customerId, feedback.customerId._id);
      }
    }
  };
  const deleteFeedBack = (id) => {
    deleteAPI("feedback/" + id)
      .then((resp) => {
        toast.success("Successfully deleted!");
        getAllFeedback();
      })
      .catch((err) => toast.error("something went wrong."));
  };
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md ">
        <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-sm">Please rate your experience:</p>
            {/* Rating component */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingChange(value)}
                  className={`text-xl focus:outline-none hover:bg-teal-500 ${
                    value <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  style={{ padding: "3px" }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm">Please provide your feedback:</p>
            {/* Feedback textarea */}
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Enter your feedback here..."
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed m-auto"
            style={{ backgroundColor: "#01959a" }}
            disabled={submitting}
          >
            {edit
              ? submitting
                ? "Updating..."
                : "Update Feedback"
              : submitting
              ? "Submitting..."
              : "Submit Feedback"}
            {/* {submitting ? "Submitting..." : "Submit Feedback"} */}
          </button>
        </form>
      </div>
      <div className="container mx-auto py-8">
        <button onClick={() => generatePDF(`feedback-1`)}>Download PDF</button>
      </div>
      <input
          type="text"
          placeholder="Search feedback..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full border rounded-md px-3 py-2"
        />
        <br />
      <div className="container mx-auto py-8" id={`feedback-1`}>
        <h2 className="text-3xl font-bold mb-4">All Ratings and Feedback</h2>
      
        <br />
        <br />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Allfeedback &&
            Allfeedback.length > 0 &&
            Allfeedback.filter((feedback) =>
              feedback.feedback
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ).map((feedback) => (
              <div>
                {true && (
                  <li
                    key={feedback._id}
                    className="bg-white rounded-lg shadow-md p-4"
                    onClick={() => handleItemClick(feedback)}
                  >
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-gray-600 mr-2"
                      />
                      <span className="text-gray-800">
                        {feedback.customerId && feedback.customerId.firstName}{" "}
                        {feedback.customerId && feedback.customerId.lastName}
                        {!feedback.customerId && "User Not Found"}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Rating:</span>
                      <div className="flex">
                        {[...Array(parseInt(feedback.rating))].map(
                          (_, index) => (
                            <FontAwesomeIcon
                              key={index}
                              icon={faStar}
                              className="text-yellow-500 mr-1"
                            />
                          )
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700">{feedback.feedback}</p>
                    <br />
                    <div onClick={() => deleteFeedBack(feedback._id)}>
                      {feedback.customerId &&
                        feedback.customerId._id === UserId && (
                          <FontAwesomeIcon icon={faTrash} color="red" />
                        )}
                    </div>
                  </li>
                )}
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackForm;
