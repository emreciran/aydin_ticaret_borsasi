import FuseUtils from "@fuse/utils/FuseUtils";
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";
import axios from "src/app/axios";

class AnnouncementService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.axiosPrivate();
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

  axiosPrivate = () => {
    const axiosPrivate = useAxiosPrivate();
    return axiosPrivate;
  };

  getAnnouncements = (pageState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/announcements?page=${pageState.page}&limit=${pageState.pageSize}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        }).catch((error) => {
            reject(
              error.response ? error.response.data.message : error.message
            );
        });
    });
  };

  deleteAnnouncement = (id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`/announcements/${id}`).then((response) => {
        if (response.data) resolve(response.data);
        else
          reject(error.response ? error.response.data.message : error.message);
      });
    });
  };

  updateAnnouncement = (data) => {
    return new Promise((resolve, reject) => {
      axios.put(`/announcements`, data).then((response) => {
        if (response.data) resolve(response.data);
        else
          reject(error.response ? error.response.data.message : error.message);
      });
    });
  };
}

const instance = new AnnouncementService();

export default instance;
