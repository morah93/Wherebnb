const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { SpotImage, Spot, User, Review, sequelize } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const spot = require("../../db/models/spot");
const { Op } = require("sequelize");




