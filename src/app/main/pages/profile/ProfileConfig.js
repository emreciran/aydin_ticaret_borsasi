import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import Profile from "./Profile";

i18next.addResourceBundle("en", "Profile", en);
i18next.addResourceBundle("tr", "Profile", tr);

const ProfileConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "profile",
      element: <Profile />,
    },
  ],
};

export default ProfileConfig;
