import React from "react";
import axios from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { selectIsAuth } from "../../redux/slices/auth";
import { createNote } from "../../redux/slices/notes";
import { fetchTableData } from "../../redux/slices/notes";

import styles from "./AddNote.module.scss";
import { useAppDispatch } from "../../redux/store";
import { Note } from "../../redux/slices/notes";

export const AddNote: React.FC = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [companySigDate, setCompanySigDate] = React.useState("");
  const [companySignatureName, setCompanySignatureName] = React.useState("");
  const [documentName, setDocumentName] = React.useState("");
  const [documentStatus, setDocumentStatus] = React.useState("");
  const [documentType, setDocumentType] = React.useState("");
  const [employeeNumber, setEmployeeNumber] = React.useState("");
  const [employeeSigDate, setEmployeeSigDate] = React.useState("");
  const [employeeSignatureName, setEmployeeSignatureName] = React.useState("");

  const isEditing = Boolean(id);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchTableData())
        .then((data) => {
          const editingNote = data.payload.filter(
            (item: Note) => item.id === id
          )[0];
          setCompanySigDate(editingNote.companySigDate);
          setCompanySignatureName(editingNote.companySignatureName);
          setDocumentName(editingNote.documentName);
          setDocumentStatus(editingNote.documentStatus);
          setDocumentType(editingNote.documentType);
          setEmployeeNumber(editingNote.employeeNumber);
          setEmployeeSigDate(editingNote.employeeSigDate);
          setEmployeeSignatureName(editingNote.employeeSignatureName);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка в получении записи");
        });
    }
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async () => {
    try {
      const fields = {
        companySigDate: companySigDate
          ? companySigDate
          : new Date().toISOString(),
        companySignatureName,
        documentName,
        documentStatus,
        documentType,
        employeeNumber,
        employeeSigDate: employeeSigDate
          ? employeeSigDate
          : new Date().toISOString(),
        employeeSignatureName,
      };

      const { data } = isEditing
        ? await axios.post(
            `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
            fields
          )
        : await axios.post(
            "/ru/data/v3/testmethods/docs/userdocs/create",
            fields
          );

      if (!isEditing) {
        dispatch(createNote(data.data));
      }

      navigate("/");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании записи");
    }
  };

  return (
    <Paper style={{ padding: 30, width: 600 }} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {isEditing ? "Редактирование записи" : "Новая запись"}
      </Typography>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="companySignatureName"
        value={companySignatureName}
        onChange={(e) => setCompanySignatureName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="documentName"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="documentStatus"
        value={documentStatus}
        onChange={(e) => setDocumentStatus(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="documentType"
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="employeeNumber"
        value={employeeNumber}
        type="number"
        onChange={(e) => setEmployeeNumber(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="employeeSignatureName"
        value={employeeSignatureName}
        onChange={(e) => setEmployeeSignatureName(e.target.value)}
        fullWidth
      />

      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Добавить"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
