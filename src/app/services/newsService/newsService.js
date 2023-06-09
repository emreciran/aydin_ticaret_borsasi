import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";
import newsServiceConfig from "./newsServiceConfig";

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
        .get(
          `${newsServiceConfig.getNews}?page=${pageState.page}&limit=${pageState.pageSize}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  createNews = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(newsServiceConfig.createNews, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  deleteNews = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${newsServiceConfig.deleteNews}/${id}`)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  updateNews = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(newsServiceConfig.updateNews, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };
}

const instance = new NewsService();

export default instance;
