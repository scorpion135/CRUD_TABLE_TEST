import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import { selectIsAuth } from "../redux/slices/auth";
import { fetchTableData, fetchRemoveNote } from "../redux/slices/notes";

import styles from "./Home.module.scss";
import { RootState, useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const { items, status } = useSelector((state: RootState) => state.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(fetchTableData());
    } catch (e) {
      console.warn(e.message);
    }
  }, []);

  const onClickRemoveNote = async (id: string) => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить запись?")) {
        await dispatch(fetchRemoveNote(id));
        dispatch(fetchTableData());
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (status === "error") {
    alert("Не удалось загрузить записи");
  }

  const columns = [
    {
      field: "companySigDate",
      headerName: "CompanySigDate",
      width: 220,
    },
    {
      field: "companySignatureName",
      headerName: "CompanySignatureName",
      width: 200,
    },
    {
      field: "documentName",
      headerName: "DocumentName",
      width: 160,
    },
    {
      field: "documentStatus",
      headerName: "DocumentStatus",
      width: 160,
    },
    {
      field: "documentType",
      headerName: "DocumentType",
      width: 160,
    },
    {
      field: "employeeNumber",
      headerName: "EmployeeNumber",
      width: 170,
    },
    {
      field: "employeeSigDate",
      headerName: "EmployeeSigDate",
      width: 220,
    },
    {
      field: "employeeSignatureName",
      headerName: "EmployeeSignatureName",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      editable: false,

      renderCell: (params) => (
        <div className={styles.actions}>
          <Link to={`add-note/${params.row.id}/edit`} className={styles.link}>
            <Edit color="primary" sx={{ cursor: "pointer" }} />
          </Link>

          <DeleteIcon
            color="error"
            onClick={() => {
              onClickRemoveNote(params.row.id);
            }}
            sx={{ cursor: "pointer" }}
          />
        </div>
      ),
      width: 150,
    },
  ];

  const rows = items;

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      {isAuth && (
        <>
          <h1 className={styles.title}>Таблица данных</h1>
          <Paper sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              loading={status === "loading"}
              disableColumnMenu
            />
          </Paper>
        </>
      )}
    </>
  );
};
