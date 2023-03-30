import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";

class NewsService extends FuseUtils.EventEmitter {
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

  getNews = (pageState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/news?page=${pageState.page}&limit=${pageState.pageSize}`)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error.response ? error.response.data.message : error.message);
        });
    });
  };

  deleteNews = (id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`/news/${id}`).then((response) => {
        if (response.data) resolve(response.data);
        else
          reject(error.response ? error.response.data.message : error.message);
      });
    });
  };

  updateNews = (data) => {
    return new Promise((resolve, reject) => {
      axios.put(`/news`, data).then((response) => {
        if (response.data) resolve(response.data);
        else
          reject(error.response ? error.response.data.message : error.message);
      });
    });
  };
}

const instance = new NewsService();

export default instance;
