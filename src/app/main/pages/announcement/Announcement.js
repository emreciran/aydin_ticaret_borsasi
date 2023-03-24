import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import AnnouncementTable from "./components/AnnouncementTable";
import Swal from "sweetalert2";
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";
import useToast from "src/app/hooks/useToast";

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

const Announcement = () => {
  const { t } = useTranslation("Announcement");
  const [_showToast] = useToast();
  const axiosPrivate = useAxiosPrivate();

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const getAnnouncement = async () => {
    try {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      const res = await axiosPrivate.get(
        `/announcements?page=${pageState.page}&limit=${pageState.pageSize}`
      );

      if (res.data != null) {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: res.data.announcement,
          total: res.data.total,
        }));
      }
    } catch (error) {
      setPageState((old) => ({
        ...old,
        isLoading: false,
      }));
      _showToast.showError(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  useEffect(() => {
    getAnnouncement();
  }, [pageState.page, pageState.pageSize]);

  return (
    <Root
      header={
        <div className="p-24 flex items-center justify-between">
          <h3>{t("TITLE")}</h3>
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={() => navigate("/duyuru/yeni")}
          >
            {t("BUTTON")}
          </Button>
        </div>
      }
      content={
        <div className="p-24">
          <AnnouncementTable
            pageState={pageState}
            setPageState={setPageState}
          />
        </div>
      }
      scroll="content"
    />
  );
};

export default Announcement;
