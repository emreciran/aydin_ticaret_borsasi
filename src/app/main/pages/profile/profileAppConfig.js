import i18next from 'i18next';
import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));
import en from "./i18n/en";
import tr from "./i18n/tr";

i18next.addResourceBundle("en", "ProfileApp", en);
i18next.addResourceBundle("tr", "ProfileApp", tr);

const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/profile',
      element: <ProfileApp />,
    },
  ],
};

export default profileAppConfig;
