import authenticationPagesConfig from "./authentication/authenticationPagesConfig";
import homePageConfig from "./home/HomeConfig";
import newsPageConfig from "./news/NewsConfig";
import announcementPageConfig from "./announcement/AnnouncementConfig";
import profileAppConfig from "./profile/profileAppConfig";
import usersPageConfig from "./users/UsersConfig";

const pagesConfigs = [
  ...authenticationPagesConfig,
  homePageConfig,
  newsPageConfig,
  announcementPageConfig,
  profileAppConfig,
  usersPageConfig,
];

export default pagesConfigs;
