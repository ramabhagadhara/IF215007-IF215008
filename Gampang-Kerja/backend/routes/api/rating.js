const express = require("express");
const router = express.Router();


const auth = require("../../middleware/auth");


const JobRating = require("../../models/JobRating");
const ApplicantRating = require("../../models/ApplicantRating");
const Applicant = require("../../models/Applicant");
const Listing = require("../../models/Listing");


router.post("/applicant", auth("Recruiter"), async function (req, res) {
  const { value, recruiterId, applicantId } = req.body;
  if (!value || !recruiterId || !applicantId) return res.sendStatus(400);
  if (value < 0 || value > 5)
    return res.status(400).json({ msg: "Rating must be between 0 and 5" });

  let rating = await ApplicantRating.findOne({ applicantId, recruiterId });
  if (!rating) {
    rating = new ApplicantRating({ recruiterId, applicantId, value });
    await Applicant.findByIdAndUpdate(applicantId, {
      $inc: { numRatings: 1, ratingSum: value },
    });
    rating = await rating.save();
    return res.json({ rating });
  }
  await Applicant.findByIdAndUpdate(applicantId, {
    $inc: { ratingSum: value - rating.value },
  });
  rating.value = value;
  rating = await rating.save();
  return res.json({ rating });
});


router.post("/listing", auth("Applicant"), async function (req, res) {
  const { value, listingId, applicantId } = req.body;
  if (!value || !listingId || !applicantId) return res.sendStatus(400);
  if (value < 0 || value > 5)
    return res.status(400).json({ msg: "Rating must be between 0 and 5" });

  let rating = await JobRating.findOne({ applicantId, listingId });
  if (!rating) {
    rating = new JobRating({ listingId, applicantId, value });
    await Listing.findByIdAndUpdate(listingId, {
      $inc: { numRatings: 1, ratingSum: value },
    });
  }
  rating.value = value;
  rating = await rating.save();
  res.json({ rating });
});


router.get("/listing/byapplicant/:applicantid", async function (req, res) {
  const applicantId = req.params.applicantid;
  const ratings = await JobRating.find({ applicantId });
  res.json({ ratings });
});


router.get("/applicant/byrecruiter/:recruiterid", async function (req, res) {
  const recruiterId = req.params.recruiterid;
  const ratings = await ApplicantRating.find({ recruiterId });
  res.json({ ratings });
});


router.get("/listing/:listingid/:applicantid", async function (req, res) {
  const applicantId = req.params.applicantid;
  const listingId = req.params.applicantid;
  let rating = await JobRating.findOne({ applicantId, listingId });
  res.json({ rating });
});


router.get("/applicant/:applicantid/:recruiterid", async function (req, res) {
  const applicantId = req.params.applicantid;
  const recruiterId = req.params.recruiterid;
  let rating = await ApplicantRating.findOne({ applicantId, recruiterId });
  res.json({ rating });
});

module.exports = router;
