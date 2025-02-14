const express = require("express")
const router = express.Router()


const { contact } = require("../controllers/ContactUs")
router.post("/contactUs", contact)

module.exports = router