import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";
import announcementServiceConfig from "./announcementServiceConfig";

class AnnouncementService extends FuseUtils.EventEmitter {
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

  getAnnouncements = (pageState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${announcementServiceConfig.getAnnouncements}?page=${pageState.page}&limit=${pageState.pageSize}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  createAnnouncement = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(announcementServiceConfig.createAnnouncement, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  deleteAnnouncement = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${announcementServiceConfig.deleteAnnouncement}/${id}`)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  updateAnnouncement = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(announcementServiceConfig.updateAnnouncement, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };
}

const instance = new AnnouncementService();

export default instance;
