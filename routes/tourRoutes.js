const express = require("express");

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require("../controllers/tourController");

const { protect, restrictTo } = require("../controllers/authController");

const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

// **** NESTED ROUTES ****
// POST /tours/288383893/reviews
// GET /tours/2I88282882/reviews
// GET /tours/3883838393/reviews/993930fe
// router.post("/:tourId/reviews", protect, restrictTo("user"), createReview);
router.use("/:tourId/reviews", reviewRouter);

router.get("/top-5-cheap", aliasTopTours, getAllTours);

router.get("/tours-stats", getTourStats);
router.get(
  "/monthly-plan/:year",
  protect,
  restrictTo("guide", "lead-guide", "admin"),
  getMonthlyPlan
);

router.get("/tours-within/:distance/center/:latlng/unit/:unit", getToursWithin);
router.get("/distances/:latlng/unit/:unit", getDistances);

// router.route("/").get(protect, getAllTours).post(createTour);
router.get("/", getAllTours);
router.post("/", protect, restrictTo("lead-guide", "admin"), createTour);

router.get("/:id", getTour);
router.patch(
  "/:id",
  protect,
  restrictTo("lead-guide", "admin"),
  uploadTourImages,
  resizeTourImages,
  updateTour
);
router.delete("/:id", protect, restrictTo("lead-guide", "admin"), deleteTour);
// router
//   .route("/:id")
//   .get(getTour)
//   .patch(updateTour)
//   .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = router;
