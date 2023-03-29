import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box, Button, Typography } from "@mui/material";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {
    display: "block",
  },
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

const Profile = () => {
  return (
    <Root
    header={
      <div className="p-24 flex items-center justify-between">
        <h3>Profile</h3>
      </div>
    }
    content={
      <div className="p-24">
        Profile
      </div>
    }
    scroll="content"
  />
  )
}

export default Profile