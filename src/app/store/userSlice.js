/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { setInitialSettings } from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import settingsConfig from "app/configs/settingsConfig";
import jwtService from "../auth/services/jwtService";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const setUser = createAsyncThunk(
  "user/setUser",
  async (user, { dispatch, getState }) => {
    /*
    You can redirect the logged-in user to a specific route depending on his role
    */
    // if (user.role === "admin") {
    //   settingsConfig.loginRedirectUrl = "/admin"; // for example 'apps/academy'
    // } else {
    //   settingsConfig.loginRedirectUrl = "/";
    // }
    settingsConfig.loginRedirectUrl = "/";
    ///window.location.reload()
    return user;
  }
);

export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  "user/updateShortucts",
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };
    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.role || user.role.length === 0) {
    // is guest

    return null;
  }

  history.push({
    pathname: "/",
  });

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: "User data saved with api" }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const token = localStorage.getItem("jwt_access_token") || null;
const decodedToken = token ? jwt_decode(token) : false;

const initialState = {
  user: Date.now() <= decodedToken.exp * 1000 ? decodedToken : false,
  role:
    Date.now() <= decodedToken.exp * 1000
      ? `${decodedToken.role.toLowerCase()}`
      : [], // guest

  //role: [], // guest
  data: {
    photoURL: "assets/images/avatars/brian-hughes.jpg",
    shortcuts: ["apps.calendar", "apps.mailbox", "apps.contacts", "apps.tasks"],
  },
};

const logoutData = {
  user: false,
  role: [],
  data: {
    photoURL: "assets/images/avatars/brian-hughes.jpg",
    shortcuts: ["apps.calendar", "apps.mailbox", "apps.contacts", "apps.tasks"],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut: (state, action) => logoutData,
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;
