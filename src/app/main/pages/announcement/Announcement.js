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
import Popup from "app/shared-components/Popup";
import NewAnnouncementForm from "./components/NewAnnouncementForm";
import AnnouncementService from "src/app/services/announcementService";
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

const Announcement = () => {
  const { t } = useTranslation("Announcement");
  const [_showToast] = useToast();
  const axiosPrivate = useAxiosPrivate();
  const modalTranslate = t("NEWANNOUNCEMENT", { returnObjects: true });
  const [open, setOpen] = useState(false);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const getAnnouncement = () => {
    setPageState((old) => ({
      ...old,
      isLoading: true,
    }));
    AnnouncementService.getAnnouncements(pageState)
      .then((response) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.announcements,
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

  const DeleteAnnouncement = (id) => {
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
            AnnouncementService.deleteAnnouncement(id).then((response) => {
              getAnnouncement();
              swalWithBootstrapButtons.fire(
                "Silindi!",
                "Duyuru başarıyla silindi!",
                "success"
              );
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "İptal edildi!",
              "Duyuru silinmedi!",
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
    getAnnouncement();
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
            <AnnouncementTable
              pageState={pageState}
              setPageState={setPageState}
              DeleteAnnouncement={DeleteAnnouncement}
              getAnnouncement={getAnnouncement}
            />
          </div>
        }
        scroll="content"
      />
      <Popup open={open} setOpen={setOpen} title={modalTranslate.headerTitle}>
        <NewAnnouncementForm
          setOpen={setOpen}
          getAnnouncement={getAnnouncement}
        />
      </Popup>
    </>
  );
};

export default Announcement;
