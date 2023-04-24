import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "src/app/axios";
import eventServiceConfig from "./eventServiceConfig";

class EventService extends FuseUtils.EventEmitter {
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

  getEvents = (pageState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${eventServiceConfig.getEvents}?page=${pageState.page}&limit=${pageState.pageSize}`
        )
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  createEvent = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(eventServiceConfig.createEvent, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${eventServiceConfig.deleteEvent}/${id}`)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };

  updateEvent = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(eventServiceConfig.updateEvent, data)
        .then((response) => {
          if (response.data) resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error.message : "Error!");
        });
    });
  };
}

const instance = new EventService();

export default instance;
