const express = require("express");

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

// Protect all routes under this MIDDLEWARE
router.use(protect);

router.get("/", getAllReviews);
router.post("/", restrictTo("user"), setTourUserIds, createReview);
router.get("/:id", getReview);
router.patch("/:id", restrictTo("user", "admin"), updateReview);
router.delete("/:id", restrictTo("user", "admin"), deleteReview);

module.exports = router;
