import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";

class UserService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
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

  getUsers = (pageState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/users?page=${pageState.page}&limit=${pageState.pageSize}`)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error.response ? error.response.data.message : error.message);
        });
    });
  };

  updateUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.put(`/users`, data).then((response) => {
        if (response.data) resolve(response.data);
        else
          reject(error.response ? error.response.data.message : error.message);
      });
    });
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post("/users", data).then((response) => {
        if (response.data) resolve(response.data);
        else
          reject(error.response ? error.response.data.message : error.message);
      });
    });
  };
}

const instance = new UserService();

export default instance;
