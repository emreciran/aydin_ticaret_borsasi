import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir email giriniz!")
    .required("Email alanı zorunludur!"),

  password: Yup.string()
    .required("Şifre alanı zorunludur!")
    .min(4, "Şifreniz en az 4 karakter olmalıdır!"),
});
