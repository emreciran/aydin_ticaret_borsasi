import React, { useState, useEffect } from "react";
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
import UpdateUserForm from "./UpdateUserForm";

const UsersTable = ({ pageState, setPageState,getUsers }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("Users");

  const [rowSelectionModel, setRowSelectionModel] = useState();
  const columnsTranslate = t("COLUMNS", { returnObjects: true });
  
  const columns = [
    { field: "id", headerName: "#" },
    { field: "name", headerName: columnsTranslate.name },
    { field: "surname", headerName: columnsTranslate.surname },
    { field: "email", headerName: columnsTranslate.email },
    { field: "username", headerName: columnsTranslate.username },
    { field: "role", headerName: columnsTranslate.role },
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
      field: "update",
      headerName: columnsTranslate.update,
      renderCell: () => {
        return (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label={columnsTranslate.update}
              style={{ margin: "0 auto" }}
              onClick={() => setOpen(true)}
            />
            <Popup
              open={open}
              setOpen={setOpen}
              title={`#${rowSelectionModel?.id} Kullanıcı Güncelle`}
            >
              <UpdateUserForm
                data={rowSelectionModel}
                setOpen={setOpen}
                getUsers={getUsers}
              />
            </Popup>
          </>
        );
      },
    },
  ];

  const rows = pageState?.data
    ? pageState?.data.map((row) => ({
        id: row.useR_ID,
        name: row.name,
        surname: row.surname,
        email: row.email,
        username: row.username,
        status: row.status,
        role: row.role,
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

export default UsersTable;
