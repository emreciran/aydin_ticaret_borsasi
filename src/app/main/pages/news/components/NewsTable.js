import React, { useState } from "react";
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
    { field: "createdBy", headerName: columnsTranslate.createdBy },
    { field: "updatedBy", headerName: columnsTranslate.updatedBy },
    { field: "createdDate", headerName: columnsTranslate.createdDate },
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
          onClick={() => DeleteNews(params.id)}
          label={columnsTranslate.delete}
          showInMenu
        />,
      ],
    },
  ];

  const rows = pageState?.data
    ? pageState?.data.map((row) => ({
        id: row.id,
        title: row.title,
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
          paginationMode="server"
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
};

export default NewsTable;
