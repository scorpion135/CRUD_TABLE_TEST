import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { logout, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Header.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const items = useSelector((state) => state.notes.items);

  const onClickLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>CRUD TABLE</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-note">
                  <Button size="large" variant="contained">
                    Добавить запись
                  </Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  size="large"
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="large" variant="contained">
                    Войти
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
