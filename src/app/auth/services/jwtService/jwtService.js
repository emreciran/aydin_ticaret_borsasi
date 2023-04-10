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
          if (response?.data) {
            this.setSession(response.data.authResult.token);
            const decoded = jwtDecode(response.data.authResult.token);

            const userData = {
              user: decoded,
              role:
                Date.now() <= decoded.exp * 1000
                  ? `${decoded.role.toLowerCase()}`
                  : [], // guest
              data: {
                photoURL: "assets/images/avatars/brian-hughes.jpg",
                shortcuts: [
                  "apps.calendar",
                  "apps.mailbox",
                  "apps.contacts",
                  "apps.tasks",
                ],
              },
            };
            resolve(userData);

            this.emit("onLogin", userData);
          }
        })
        .catch((error) => {
          reject(error.response ? error.response.data.message : error.message);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("jwt_access_token");
      const decoded = jwtDecode(token);
      const userData = {
        user: decoded,
        role:
          Date.now() <= decoded.exp * 1000
            ? `${decoded.role.toLowerCase()}`
            : [], // guest
        data: {
          photoURL: "assets/images/avatars/brian-hughes.jpg",
          shortcuts: [
            "apps.calendar",
            "apps.mailbox",
            "apps.contacts",
            "apps.tasks",
          ],
        },
      };
      this.setSession(token);
      resolve(userData);
    });
  };

  forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${jwtServiceConfig.forgotPassword}?email=${email}`)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error.response ? error.response.data.message : error.message);
        });
    });
  };

  resetPassword = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.resetPassword, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error.response ? error.response.data.message : error.message);
        });
    });
  };

  sendConfirmEmail = (email) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${jwtServiceConfig.sendConfirmEmail}?email=${email}`)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error.response ? error.response.data.message : error.message);
        });
    });
  };

  updateUserData = (user) => {
    return axioS.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      //Cookies.remove("jwt");
      localStorage.removeItem("jwt_access_token");
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
    return localStorage.getItem("jwt_access_token");
  };
}

const instance = new JwtService();

export default instance;
