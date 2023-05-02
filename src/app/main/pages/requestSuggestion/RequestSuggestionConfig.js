import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import RequestSuggestion from "./RequestSuggestion";

i18next.addResourceBundle("en", "REQSUGG", en);
i18next.addResourceBundle("tr", "REQSUGG", tr);

const RequestSuggestionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "istek_oneri",
      element: <RequestSuggestion />,
    },
  ],
};

export default RequestSuggestionConfig;
