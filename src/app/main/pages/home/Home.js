import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box, Button, Typography } from "@mui/material";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";

const Root = styled(FusePageCarded)(({ theme }) => ({
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

const Home = () => {
  return (
    <Root
    header={
      <div className="p-24 flex items-center justify-between w-full">
        <h3>Home</h3>
      </div>
    }
    content={
      <div className="p-24">
        Home
      </div>
    }
    scroll="content"
  />
  )
}

export default Home