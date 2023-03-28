import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";
import Cookies from "js-cookie";
import axioS from "axios";

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(error.response ? error.response.data.message : error.message);
        }
      });
    });
  };

  signInWithEmailAndPassword = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, data, { withCredentials: true })
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.authResult.token);
            resolve(response.data.authResult.token);
            this.emit("onLogin", response.data.authResult.token);
          }
        })
        .catch((error) => {
          reject(error.response ? error.response.data.message : error.message);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const token = Cookies.get("jwt");
      this.setSession(token);
      resolve(token);
    });
  };

  updateUserData = (user) => {
    return axioS.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      //localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      Cookies.remove("jwt");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return Cookies.get("jwt");
  };
}

const instance = new JwtService();

export default instance;
