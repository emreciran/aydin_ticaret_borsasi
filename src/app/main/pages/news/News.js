import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import useToast from "src/app/hooks/useToast";
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";
import NewsTable from "./components/NewsTable";
import Popup from "app/shared-components/Popup";
import NewNewsForm from "./components/NewNewsForm";

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

const News = () => {
  const { t } = useTranslation("News");
  const [_showToast] = useToast();
  const axiosPrivate = useAxiosPrivate();

  const [open, setOpen] = useState(false);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const getNews = async () => {
    try {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      const res = await axiosPrivate.get(
        `/news?page=${pageState.page}&limit=${pageState.pageSize}`
      );

      if (res.data != null)
        [
          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: res.data.news,
            total: res.data.total,
          })),
        ];
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
    getNews();
  }, [pageState.page, pageState.pageSize]);

  return (
    <>
      <Root
        header={
          <div className="p-24 flex items-center justify-between">
            <h3>{t("TITLE")}</h3>
            <Button
              variant="outlined"
              endIcon={<AddCircleIcon />}
              onClick={() => setOpen(true)}
            >
              {t("BUTTON")}
            </Button>
          </div>
        }
        content={
          <div className="p-24">
            <NewsTable pageState={pageState} setPageState={setPageState} />
          </div>
        }
        scroll="content"
      />
      <Popup open={open} setOpen={setOpen} title={"Yeni Haber"}>
        <NewNewsForm setOpen={setOpen} getNews={getNews} />
      </Popup>
    </>
  );
};

export default News;
