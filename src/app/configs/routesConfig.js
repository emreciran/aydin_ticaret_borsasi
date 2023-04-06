import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/pages/sign-in/SignInConfig";
import SignUpConfig from "../main/pages/sign-up/SignUpConfig";
import SignOutConfig from "../main/pages/sign-out/SignOutConfig";
import ForgotPasswordConfig from "../main/pages/forgot-password/ForgotPasswordConfig";
import Error404Page from "../main/404/Error404Page";
import AnnouncementConfig from "../main/pages/announcement/AnnouncementConfig";
import NewsConfig from "../main/pages/news/NewsConfig";
import HomeConfig from "../main/pages/home/HomeConfig";
import UsersConfig from "../main/pages/users/UsersConfig";
import profileAppConfig from "../main/pages/profile/profileAppConfig";
import ResetPasswordConfig from "../main/pages/reset-password/ResetPasswordConfig";

const routeConfigs = [
  HomeConfig,
  profileAppConfig,
  UsersConfig,
  AnnouncementConfig,
  NewsConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "/profile",
    element: <Navigate to="/profile" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "/kullanicilar",
    element: <Navigate to="/kullanicilar" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "/duyuru",
    element: <Navigate to="/duyuru" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "/haber",
    element: <Navigate to="/haber" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
    auth: settingsConfig.defaultAuth,
  },
];

export default routes;
