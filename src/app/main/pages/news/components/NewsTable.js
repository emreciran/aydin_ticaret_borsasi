import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
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
import UpdateNewsForm from "./UpdateNewsForm";

const NewsTable = ({ pageState, setPageState, DeleteNews, getNews }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("News");

  const [rowSelectionModel, setRowSelectionModel] = useState();
  const columnsTranslate = t("COLUMNS", { returnObjects: true });

  const columns = [
    { field: "id", headerName: "#" },
    { field: "title", headerName: columnsTranslate.title },
    { field: "createdDate", headerName: columnsTranslate.createdDate },
    {
      field: "update",
      headerName: columnsTranslate.update,
      renderCell: () => {
        return (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label={columnsTranslate.update}
              style={{ margin: "0 auto" }}
              onClick={() => {
                setOpen(true);
              }}
            />
            <Popup
              open={open}
              setOpen={setOpen}
              title={`#${rowSelectionModel?.id} Haber Güncelle`}
            >
              <UpdateNewsForm
                data={rowSelectionModel}
                setOpen={setOpen}
                getNews={getNews}
              />
            </Popup>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: columnsTranslate.delete,
      renderCell: (params) => {
        return (
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label={columnsTranslate.delete}
            onClick={() => DeleteNews(params.id)}
          />
        );
      },
    },
  ];

  const rows = pageState?.data
    ? pageState?.data.map((row) => ({
        id: row.id,
        title: row.title,
        details: row.details,
        imageName: row.imageName,
        createdDate: row.createdDate,
      }))
    : "";

  return (
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
        paginationMode="server"
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        getRowId={(row) => row.id}
        hideFooterSelectedRowCount
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
          setRowSelectionModel(selectedRowData[0]);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(newPage) => {
          setPageState((old) => ({
            ...old,
            page: newPage + 1
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
  );
};

export default NewsTable;
