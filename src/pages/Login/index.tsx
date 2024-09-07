import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthProps } from "../../redux/slices/auth";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { fetchAuthLogin, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Login.module.scss";
import { useAppDispatch } from "../../redux/store";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthProps>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: AuthProps) => {
    const regexUsername = /^user[1-9][0-9]*$/;

    if (!regexUsername.test(values.username)) {
      alert("Неверное имя или пароль");
      return;
    }
    const data = await dispatch(fetchAuthLogin(values));
    const serverResponse = data.payload.data;
    console.log(serverResponse);

    if (!serverResponse) {
      return alert("Не удалось авторизоваться");
    }

    if ("token" in serverResponse) {
      window.localStorage.setItem("token", serverResponse.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Имя"
          type="text"
          error={Boolean(errors.username?.message)}
          helperText={errors.username?.message}
          {...register("username", {
            required: { value: true, message: "Укажите имя" },
          })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
