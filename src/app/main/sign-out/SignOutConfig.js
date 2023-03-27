import SignOutPage from "./SignOutPage";

import en from "./i18n/en";
import tr from "./i18n/tr";
import i18next from "i18next";

i18next.addResourceBundle("en", "SignOut", en);
i18next.addResourceBundle("tr", "SignOut", tr);

const SignOutConfig = {
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
  auth: null,
  routes: [
    {
      path: "sign-out",
      element: <SignOutPage />,
    },
  ],
};

export default SignOutConfig;
