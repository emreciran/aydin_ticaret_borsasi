import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";
import weeklyMarketCommentServiceConfig from "./weeklyMarketCommentServiceConfig";

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

  getWeeklyMarketComments = (pageState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${weeklyMarketCommentServiceConfig.getWeeklyMarketComments}?page=${pageState.page}&limit=${pageState.pageSize}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  createWeeklyMarketComment = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(weeklyMarketCommentServiceConfig.createWeeklyMarketComment, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  deleteWeeklyMarketComment = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `${weeklyMarketCommentServiceConfig.deleteWeeklyMarketComment}/${id}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  updateWeeklyMarketComment = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(weeklyMarketCommentServiceConfig.updateWeeklyMarketComment, data)
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
