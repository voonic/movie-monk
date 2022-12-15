import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createReview } from "../services/user-review-services";
import StarComponent from "../star-component/star-component";

const CriticUserReviewForm = ({ movieId }) => {
  const user = useSelector((state) => state.user);
  console.log(movieId);
  const [review, setReview] = useState({ movieId, reviewedBy: user.id });

  const submitReview = async (e) => {
    e.preventDefault();
    const retReview = await createReview(review);
    console.log(retReview);
    return false;
  };

  const updateRating = (rating) => {
    editHandler("reviewRating", rating);
  };

  const editHandler = (k, v) => {
    setReview((review) => {
      return {
        ...review,
        [k]: v,
      };
    });
  };

  useEffect(() => {
    editHandler("movieId", movieId);
  }, [movieId]);

  return (
    <div className="container">
      <form onSubmit={submitReview}>
        <div>
          <h5>Acting</h5>
          <StarComponent onChange={updateRating} />
        </div>
        <div>
          <h5>Direction</h5>
          <StarComponent onChange={updateRating} />
        </div>
        <div>
          <h5>Cinematography</h5>
          <StarComponent onChange={updateRating} />
        </div>
        <div>
          <h5>Soundtrack</h5>
          <StarComponent onChange={updateRating} />
        </div>
        <fieldset>
          <div className="form-group">
            <input
              id="reviewHeadLine"
              placeholder="Headline"
              className="form-control mt-4 mb-2"
              value={review.reviewTitle}
              onChange={(e) => editHandler("reviewTitle", e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              id="reviewtextarea"
              rows="5"
              placeholder="Write your review"
              value={review.reviewDetail}
              onChange={(e) => editHandler("reviewDetail", e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="reset"
              className="btn text-dark me-4 btn-outline-danger"
            >
              Discard
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CriticUserReviewForm;