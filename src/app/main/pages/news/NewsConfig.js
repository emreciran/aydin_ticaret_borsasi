import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import News from "./News";

i18next.addResourceBundle("en", "News", en);
i18next.addResourceBundle("tr", "News", tr);

const NewsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "haber",
      element: <News />,
    },
  ],
};

export default NewsConfig;
