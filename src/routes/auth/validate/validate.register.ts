import { body } from "express-validator";
import { VALIDATION } from "../../../constants/validation";

export const validateRegisterData = [
  body("name")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name - minimum 2 symbols"),
  body("email").matches(VALIDATION.EMAIL).withMessage("Email is not valid"),
  body("password")
    .matches(VALIDATION.PASSWORD)
    .withMessage("Password is not valid (A, a, 1, /)"),
];
