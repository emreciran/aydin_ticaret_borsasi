import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import Announcement from "./Announcement";

i18next.addResourceBundle("en", "Announcement", en);
i18next.addResourceBundle("tr", "Announcement", tr);

const AnnouncementConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "duyuru",
      element: <Announcement />,
    },
  ],
};

export default AnnouncementConfig;
