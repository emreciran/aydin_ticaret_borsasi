import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";
import requestSuggestionServiceConfig from "./requestSuggestionServiceConfig";

class RequestSuggestionService extends FuseUtils.EventEmitter {
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

  getReqSugg = (pageState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${requestSuggestionServiceConfig.getReqSugg}?page=${pageState.page}&limit=${pageState.pageSize}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  replyRequestSuggestion = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${requestSuggestionServiceConfig.replyRequestSuggestion}`, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  deleteRequestSuggestion = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `${requestSuggestionServiceConfig.deleteRequestSuggestion}/${id}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };
}

const instance = new RequestSuggestionService();

export default instance;
