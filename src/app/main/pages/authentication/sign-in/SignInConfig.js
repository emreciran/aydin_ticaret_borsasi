import SignInPage from "./SignInPage";
import authRoles from "../../../../auth/authRoles";

import en from "./i18n/en";
import tr from "./i18n/tr";
import i18next from "i18next";

i18next.addResourceBundle("en", "SignIn", en);
i18next.addResourceBundle("tr", "SignIn", tr);

const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "sign-in",
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
