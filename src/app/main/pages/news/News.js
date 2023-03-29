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
import NewsService from "src/app/services/newsService";

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
  const modalTranslate = t("NEWNEWS", { returnObjects: true });

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

      NewsService.getNews(pageState)
        .then((response) => {
          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: response.news,
            total: response.total,
          }));
        })
        .catch((error) => {
          _showToast.showError(error);
        });
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

  const DeleteNews = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:
            "border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline",
          cancelButton:
            "border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline",
        },
      });

      swalWithBootstrapButtons
        .fire({
          title: "Emin misin?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Evet, sil!",
          cancelButtonText: "Hayır, iptal et!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            NewsService.deleteNews(id).then((response) => {
              getNews();
              swalWithBootstrapButtons.fire(
                "Silindi!",
                "Haber başarıyla silindi!",
                "success"
              );
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "İptal edildi!",
              "Haber silinmedi!",
              "error"
            );
          }
        });
    } catch (error) {
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
            <NewsTable
              pageState={pageState}
              setPageState={setPageState}
              DeleteNews={DeleteNews}
              getNews={getNews}
            />
          </div>
        }
        scroll="content"
      />
      <Popup open={open} setOpen={setOpen} title={modalTranslate.headerTitle}>
        <NewNewsForm setOpen={setOpen} getNews={getNews} />
      </Popup>
    </>
  );
};

export default News;
