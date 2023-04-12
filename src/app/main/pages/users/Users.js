import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useToast from "src/app/hooks/useToast";
import UsersTable from "./components/UsersTable";
import Popup from "app/shared-components/Popup";
import NewUserForm from "./components/NewUserForm";
import UserService from "src/app/services/userService";
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

const Users = () => {
  const { t } = useTranslation("Users");
  const [_showToast] = useToast();
  const modalTranslate = t("NEWUSER", { returnObjects: true });

  const [open, setOpen] = useState(false);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const getUsers = async () => {
    setPageState((old) => ({
      ...old,
      isLoading: true,
    }));

    UserService.getUsers(pageState)
      .then((response) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.users,
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
    getUsers();
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
            <UsersTable
              pageState={pageState}
              setPageState={setPageState}
              getUsers={getUsers}
            />
          </div>
        }
        scroll="content"
      />
      <Popup open={open} setOpen={setOpen} title={modalTranslate.title}>
        <NewUserForm setOpen={setOpen} getUsers={getUsers} />
      </Popup>
    </>
  );
};

export default Users;
