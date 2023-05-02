import authenticationPagesConfig from "./authentication/authenticationPagesConfig";
import homePageConfig from "./home/HomeConfig";
import newsPageConfig from "./news/NewsConfig";
import announcementPageConfig from "./announcement/AnnouncementConfig";
import profileAppConfig from "./profile/profileAppConfig";
import usersPageConfig from "./users/UsersConfig";
import eventConfig from "./event/EventConfig";
import requestSuggestionConfig from "./requestSuggestion/RequestSuggestionConfig";

const pagesConfigs = [
  ...authenticationPagesConfig,
  homePageConfig,
  newsPageConfig,
  announcementPageConfig,
  eventConfig,
  profileAppConfig,
  usersPageConfig,
  requestSuggestionConfig,
];

export default pagesConfigs;
