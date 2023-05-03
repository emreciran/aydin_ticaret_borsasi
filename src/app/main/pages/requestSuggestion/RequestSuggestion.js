import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import useToast from "src/app/hooks/useToast";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ReqSuggTable from "./components/ReqSuggTable";
import RequestSuggestionService from "src/app/services/requestSuggestionService";
import Swal from "sweetalert2";

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

const RequestSuggestion = () => {
  const { t } = useTranslation("REQSUGG");
  const [_showToast] = useToast();

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const getReqSugg = () => {
    setPageState((old) => ({
      ...old,
      isLoading: true,
    }));

    RequestSuggestionService.getReqSugg(pageState)
      .then((response) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.requestSuggestions,
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

  const DeleteReqSugg = (id) => {
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
        .then((result) => {
          if (result.isConfirmed) {
            RequestSuggestionService.deleteRequestSuggestion(id).then(() => {
              getReqSugg();
              swalWithBootstrapButtons.fire(
                "Silindi!",
                "Talep/Öneri başarıyla silindi!",
                "success"
              );
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "İptal edildi!",
              "Talep/Öneri silinmedi!",
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
    getReqSugg();
  }, [pageState.page, pageState.pageSize]);

  return (
    <>
      <Root
        header={
          <div className="p-24 flex items-center justify-between w-full">
            <h3>{t("TITLE")}</h3>
          </div>
        }
        content={
          <div className="p-24">
            <ReqSuggTable
              pageState={pageState}
              setPageState={setPageState}
              getReqSugg={getReqSugg}
              DeleteReqSugg={DeleteReqSugg}
            />
          </div>
        }
        scroll="content"
      />
    </>
  );
};

export default RequestSuggestion;
