import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  trTR,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomNoRowsOverlay from "app/shared-components/CustomNoRowsOverlay";
import { useTranslation } from "react-i18next";
import Popup from "app/shared-components/Popup";
import UpdateWeeklyMarketCommentForm from "./UpdateWeeklyMarketCommentForm";

const WeeklyMarketCommentTable = ({
  pageState,
  setPageState,
  DeleteWeeklyMarketComment,
  getWeeklyMarketComments,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("WeeklyMarketComment");

  const [rowSelectionModel, setRowSelectionModel] = useState();
  const columnsTranslate = t("COLUMNS", { returnObjects: true });

  const columns = [
    { field: "id", headerName: "#" },
    { field: "type", headerName: columnsTranslate.type },
    { field: "createdBy", headerName: columnsTranslate.createdBy },
    { field: "updatedBy", headerName: columnsTranslate.updatedBy },
    { field: "createdDate", headerName: columnsTranslate.createdDate },
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
              backgroundColor: row.status === true ? "#5D9C59" : "#FC2947",
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
          icon={<EditIcon />}
          onClick={() => {
            setRowSelectionModel(params?.row);
            setOpen(true);
          }}
          label={columnsTranslate.update}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => DeleteWeeklyMarketComment(params.id)}
          label={columnsTranslate.delete}
          showInMenu
        />,
      ],
    },
  ];
  const rows = pageState?.data
    ? pageState?.data.map((row) => ({
        id: row.id,
        type: row.type,
        status: row.status,
        details: row.details,
        createdBy: row.createdBy,
        updatedBy: row.updatedBy,
        imageName: row.imageName,
        createdDate: row.createdDate,
        updatedDate: row.updatedDate,
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
        title={`#${rowSelectionModel?.id} Haftalık Piyasa Yorumu Güncelle`}
      >
        <UpdateWeeklyMarketCommentForm
          data={rowSelectionModel}
          setOpen={setOpen}
          getWeeklyMarketComments={getWeeklyMarketComments}
        />
      </Popup>
    </>
  );
};

export default WeeklyMarketCommentTable;
