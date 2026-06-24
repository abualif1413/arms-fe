import * as yup from "yup";

export const userRegistrationSchema = yup
  .object({
    email: yup
      .string()
      .email("The value you are giving is not a valid email format")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirmation password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    securityQuestion: yup.string(),
    securityAnswer: yup.string(),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("The value you are giving is not a valid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
