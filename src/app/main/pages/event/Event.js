import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useToast from "src/app/hooks/useToast";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import EventTable from "./components/EventTable";
import EventService from "src/app/services/eventService";
import { useEffect } from "react";
import Popup from "app/shared-components/Popup";
import NewEventForm from "./components/NewEventForm";
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

const Event = () => {
  const { t } = useTranslation("Event");
  const [_showToast] = useToast();
  const modalTranslate = t("NEWEVENT", { returnObjects: true });
  const [open, setOpen] = useState(false);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const getEvents = () => {
    setPageState((old) => ({
      ...old,
      isLoading: true,
    }));
    EventService.getEvents(pageState)
      .then((response) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.events,
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

  const DeleteEvent = (id) => {
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
            EventService.deleteEvent(id).then((response) => {
              getEvents();
              swalWithBootstrapButtons.fire(
                "Silindi!",
                "Etkinlik başarıyla silindi!",
                "success"
              );
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "İptal edildi!",
              "Etkinlik silinmedi!",
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
    getEvents();
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
            <EventTable
              pageState={pageState}
              setPageState={setPageState}
              getEvents={getEvents}
              DeleteEvent={DeleteEvent}
            />
          </div>
        }
        scroll="content"
      />
      <Popup open={open} setOpen={setOpen} title={modalTranslate.headerTitle}>
        <NewEventForm setOpen={setOpen} getEvents={getEvents} />
      </Popup>
    </>
  );
};

export default Event;
