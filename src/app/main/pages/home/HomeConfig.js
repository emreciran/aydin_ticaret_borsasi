import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import Home from "./Home";

i18next.addResourceBundle("en", "Home", en);
i18next.addResourceBundle("tr", "Home", tr);

const HomeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/",
      element: <Home />,
    },
  ],
};

export default HomeConfig;
