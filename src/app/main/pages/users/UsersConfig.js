import i18next from "i18next";
import { authRoles } from "src/app/auth";

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
  allRoles: [
    { id: 1, name: "Admin" },
    { id: 2, name: "Yazar" },
  ],
  auth: authRoles.admin,
  routes: [
    {
      path: "kullanicilar",
      element: <Users />,
    },
  ],
};

export default UsersConfig;
