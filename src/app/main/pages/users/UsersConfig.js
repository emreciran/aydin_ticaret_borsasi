import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import Users from "./Users";

i18next.addResourceBundle("en", "Users", en);
i18next.addResourceBundle("tr", "Users", tr);

const UsersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "kullanicilar",
      element: <Users />,
    },
  ],
};

export default UsersConfig;
