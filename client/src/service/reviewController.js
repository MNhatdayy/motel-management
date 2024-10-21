import axios from "axios";

export const fetchReviews = async ({
    page = 1,
    limit = 5,
    sort,
    order,
  } = {}) => {
    const params = {
      page,
      limit,
      sort,
      order,
    };
    const res = await axios.get("/reviews", { params });
    return res.data;
  };
  

  export const createReview = async (newReview) => {
    const res = await axios.post("/reviews/create", newReview, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  };
  

  export const updateReview = async (id, updatedReview) => {
    const res = await axios.put(`/reviews/update/${id}`, updatedReview, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  };

  export const getReviewById = async (id) => {
    const res = await axios.get(`/reviews/${id}`);
    return res.data;
  };
  
  export const deleteReview = async (id) => {
    const res = await axios.delete(`/reviews/delete/${id}`);
    return res.data;
  };