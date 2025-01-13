import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .min(2, "Name must be between 2 to 16 characters")
    .matches(/^[a-zA-Z ]+$/, "No special characters allowed")
    .max(16, "Name must be between 2 to 16 characters"),

  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email address"),
  status: Yup.string().max(32, "Status must be less than 64 characters"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}\w+/,
      "Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string().required("Email address is required"),
  password: Yup.string().required("Password is required"),
});
