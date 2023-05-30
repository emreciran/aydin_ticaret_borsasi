import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import WeeklyMarketComment from "./WeeklyMarketComment";

i18next.addResourceBundle("en", "WeeklyMarketComment", en);
i18next.addResourceBundle("tr", "WeeklyMarketComment", tr);

const WeeklyMarketCommentConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "haftalik-piyasa-yorumu",
      element: <WeeklyMarketComment />,
    },
  ],
};

export default WeeklyMarketCommentConfig;
