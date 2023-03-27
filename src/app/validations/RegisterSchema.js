import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Ad alanı zorunludur!"),

  surname: Yup.string().required("Soyad alanı zorunludur!"),

  username: Yup.string().required("Username alanı zorunludur!"),

  email: Yup.string()
    .email("Geçerli bir email giriniz!")
    .required("Email alanı zorunludur!"),

  status: Yup.boolean().required("Durum alanı zorunludur!"),

  password: Yup.string()
    .required("Şifre alanı zorunludur!")
    .min(4, "Şifreniz en az 4 karakter olmalıdır!")
    .max(50, "Şifreniz en fazla 50 karakterden oluşmalıdır!")
    .matches(/[0-9]/, "Şifrenizde en az 1 sayı olmalıdır!")
    .matches(/[A-Z]/, "Şifrenizde en az 1 büyük harf olmalıdır.")
    .matches(
      /[^a-zA-Z\d\s:]/,
      "Şifrenizde en az 1 alfasayısal olmayan karakter olmalıdır."
    )
    .matches(/[a-z]/, "Şifrenizde en az 1 küçük harf olmalıdır!"),

  confirmPassword: Yup.string()
    .required("Şifre tekrar alanı zorunludur!")
    .oneOf([Yup.ref("password"), null], "Onay şifresi hatalı!"),
});
