import * as Yup from "yup";

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir email giriniz!")
    .required("Email alanı zorunludur!"),
});
