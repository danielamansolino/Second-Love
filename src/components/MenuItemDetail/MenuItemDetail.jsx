import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsForItem, createReview } from '../../utilities/reviews-api';
import '../MenuItemDetail/MenuItemDetail.css'

export default function MenuItemDetail({ menuItems, handleAddToOrder, user }) {
  const { itemId } = useParams();
  const menuItem = menuItems.find(item => item._id === itemId);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: '', rating: 0 });

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await getReviewsForItem(itemId);
        const { reviews } = response; 
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, [itemId]);

  if (!menuItem) {
    return <div>Loading...</div>;
  }

  const isItemAvailable = menuItem.stock > 0;

  const handleAddToCart = () => {
    if (isItemAvailable) {
      handleAddToOrder(itemId);
    }
  };

  async function addReview(reviewData, id) {
    try {
      const review = await createReview(reviewData, id);
      setReviews(prevReviews => [...prevReviews, review]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const reviewData = {
      text: newReview.text,
      rating: newReview.rating,
      user: user._id,
    };
    addReview(reviewData, itemId);
    setNewReview({ text: '', rating: 0 });
  }

  function handleChange(event) {
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="MenuListItem">
      <br /><br />
      <div className="picture">
        <img src={menuItem.picture} alt={menuItem.name} />
      </div>
      <div className="name">{menuItem.name}</div>
      <div className="buy">
        {isItemAvailable ? (
          <>
            <span>${menuItem.price.toFixed(2)}</span>
            <br />
            <button className="btn-sm" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </>
        ) : (
          <div className="unavailable">Item not available</div>
        )}
      </div>
      <div className="review-container">
      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet!</p>
        ) : (
          <>
            {reviews.map(review => (
              <div key={review._id}>
                <p>Review: {review.text}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="review-form">
        <h3>Add a Review</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="text"
            value={newReview.text}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleChange}
            min="0"
            max="5"
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
      </div>
    </div>
  );
}
