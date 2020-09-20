import { Box, Button, Typography } from "@material-ui/core";
import React, { createContext, FC } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { observer } from "mobx-react-lite";
import ButtonWithIcon from "../ButtonWithIcon";
import s from "./Layout.module.scss";
import { LayoutContext } from "../../models/LayoutContext";
import cartStore from "../../pages/Cart/store";

export const layoutContext = createContext<LayoutContext>({});

const Layout: FC = (props) => {
  const { children } = props;
  const { cartItemsCount } = cartStore;
  return (
    <Box className={s.layout}>
      <Box className={s.header}>
        <ButtonWithIcon icon={MenuIcon} onClick={() => undefined} />
        <ButtonWithIcon icon={SearchIcon} onClick={() => undefined} />
        <Button
          variant="contained"
          color="primary"
          className={s.cartButton}
          startIcon={<ShoppingCartIcon />}
        >
          {cartItemsCount}
        </Button>
        <Typography variant="h6">Закрыть</Typography>
      </Box>
      {children}
    </Box>
  );
};

export default observer(Layout);
