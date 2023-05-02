import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import useToast from "src/app/hooks/useToast";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ReqSuggTable from "./components/ReqSuggTable";
import RequestSuggestionService from "src/app/services/requestSuggestionService";

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
            />
          </div>
        }
        scroll="content"
      />
    </>
  );
};

export default RequestSuggestion;
