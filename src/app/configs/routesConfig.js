import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import Error404Page from "../main/404/Error404Page";
import pagesConfigs from "../main/pages/pagesConfigs";

const routeConfigs = [
  ...pagesConfigs
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
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
