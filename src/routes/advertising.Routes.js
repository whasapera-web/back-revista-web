const express = require("express");
const router = express.Router();
const validateAddAdvertising = require("../middleware/validateAddAdvertising");
const configureMulter = require("../middleware/multer");
const advertisingMulter = configureMulter("advertising")
const advertisingController = require("../controller/advertising");


router.post("/add", advertisingMulter.single("image"), validateAddAdvertising, advertisingController.addAdvertising);
router.get("/publicity/:id",advertisingController.obtainAdvertising)
router.get("/publicity",advertisingController.allAdvertising)
router.post("/addCategory",advertisingController.addCategory)
router.get("/categorys",advertisingController.allCategory)
router.delete("/delete/publicity/:id",advertisingController.deleteAdvertising)
module.exports = router;
