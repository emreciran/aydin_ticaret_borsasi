import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import Event from "./Event";

i18next.addResourceBundle("en", "Event", en);
i18next.addResourceBundle("tr", "Event", tr);

const EventConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "etkinlik",
      element: <Event />,
    },
  ],
};

export default EventConfig;
