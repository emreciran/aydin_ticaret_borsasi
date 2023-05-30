import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import useToast from "src/app/hooks/useToast";
import Popup from "app/shared-components/Popup";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import WeeklyMarketCommentService from "src/app/services/weeklyMarketCommentService";
import WeeklyMarketCommentTable from "./components/WeeklyMarketCommentTable";
import NewWeeklyMarketCommentForm from "./components/NewWeeklyMarketCommentForm";

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

const WeeklyMarketComment = () => {
  const { t } = useTranslation("WeeklyMarketComment");
  const [_showToast] = useToast();
  const modalTranslate = t("NEWWEEKLYMARKETCOMMENT", { returnObjects: true });
  const [open, setOpen] = useState(false);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const getWeeklyMarketComments = () => {
    setPageState((old) => ({
      ...old,
      isLoading: true,
    }));
    WeeklyMarketCommentService.getWeeklyMarketComments(pageState)
      .then((response) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.weeklyMarketComments,
          total: response.total,
        }));
      })
      .catch((error) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
        }));
        _showToast.showError(error);
      });
  };

  const DeleteWeeklyMarketComment = (id) => {
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
            WeeklyMarketCommentService.deleteWeeklyMarketComment(id).then(
              () => {
                getWeeklyMarketComments();
                swalWithBootstrapButtons.fire(
                  "Silindi!",
                  "Başarıyla silindi!",
                  "success"
                );
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "İptal edildi!",
              "Silinmedi!",
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
    getWeeklyMarketComments();
  }, [pageState.page, pageState.pageSize]);

  return (
    <>
      <Root
        header={
          <div className="p-24 flex items-center justify-between w-full">
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
            <WeeklyMarketCommentTable
              pageState={pageState}
              setPageState={setPageState}
              DeleteWeeklyMarketComment={DeleteWeeklyMarketComment}
              getWeeklyMarketComments={getWeeklyMarketComments}
            />
          </div>
        }
        scroll="content"
      />
      <Popup open={open} setOpen={setOpen} title={modalTranslate.headerTitle}>
        <NewWeeklyMarketCommentForm
          setOpen={setOpen}
          getWeeklyMarketComments={getWeeklyMarketComments}
        />
      </Popup>
    </>
  );
};

export default WeeklyMarketComment;
