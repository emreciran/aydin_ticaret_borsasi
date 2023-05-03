import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  trTR,
} from "@mui/x-data-grid";
import CustomNoRowsOverlay from "app/shared-components/CustomNoRowsOverlay";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import ReplyReqSuggForm from "./ReplyReqSuggForm";
import Popup from "app/shared-components/Popup";

const ReqSuggTable = ({
  pageState,
  setPageState,
  getReqSugg,
  DeleteReqSugg,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("REQSUGG");

  const [rowSelectionModel, setRowSelectionModel] = useState();
  const columnsTranslate = t("COLUMNS", { returnObjects: true });

  const columns = [
    { field: "id", headerName: "#" },
    { field: "nameSurname", headerName: columnsTranslate.nameSurname },
    { field: "phone", headerName: columnsTranslate.phone },
    { field: "email", headerName: columnsTranslate.email },
    { field: "message", headerName: columnsTranslate.message },
    {
      field: "status",
      headerName: columnsTranslate.status.name,
      renderCell: ({ row }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px"
            sx={{
              backgroundColor: row.status === true ? "#5D9C59" : "#FF6000",
            }}
          >
            <Typography color="#fff">
              {row.status === true
                ? columnsTranslate.status.active
                : columnsTranslate.status.passive}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: columnsTranslate.actions,
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ReplyIcon />}
          onClick={() => {
            setRowSelectionModel(params?.row);
            setOpen(true);
          }}
          label={columnsTranslate.reply}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => DeleteReqSugg(params.id)}
          label={columnsTranslate.delete}
          showInMenu
        />,
      ],
    },
  ];

  const rows = pageState?.data
    ? pageState?.data.map((row) => ({
        id: row.id,
        nameSurname: row.nameSurname,
        email: row.email,
        message: row.message,
        status: row.status,
        phone: row.phone,
        createdDate: row.createdDate,
        reply: row.reply !== "" ? row.reply : "",
      }))
    : "";

  return (
    <>
      <Box className="w-full">
        <DataGrid
          autoHeight
          components={{ Toolbar: GridToolbar }}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          rows={rows}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          getRowId={(row) => row.id}
          hideFooterSelectedRowCount
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.id)
            );
            setRowSelectionModel(selectedRowData[0]);
          }}
          paginationMode="server"
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={(newPage) => {
            setPageState((old) => ({
              ...old,
              page: newPage + 1,
            }));
          }}
          onPageSizeChange={(pageSize) => {
            setPageState((old) => ({
              ...old,
              pageSize: pageSize,
            }));
          }}
          localeText={
            t("TABLE") !== "default" &&
            trTR.components.MuiDataGrid.defaultProps.localeText
          }
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: pageState.pageSize } },
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
        />
      </Box>
      <Popup
        open={open}
        setOpen={setOpen}
        title={
          <Box display="flex" alignItems="center">
            <div variant="h5">#{rowSelectionModel?.id} Yanıtla</div>
            <Box
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginLeft={3}
              borderRadius="4px"
              sx={{
                backgroundColor:
                  rowSelectionModel?.status === true ? "#5D9C59" : "#FF6000",
              }}
            >
              <Typography color="#fff">
                {rowSelectionModel?.status === true
                  ? columnsTranslate.status.active
                  : columnsTranslate.status.passive}
              </Typography>
            </Box>
          </Box>
        }
      >
        <ReplyReqSuggForm
          data={rowSelectionModel}
          setOpen={setOpen}
          getReqSugg={getReqSugg}
        />
      </Popup>
    </>
  );
};

export default ReqSuggTable;
