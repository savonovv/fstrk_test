import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { priceFormatterFactory, useQuery } from "../../utils";
import cartStore from "./store";
import s from "./Cart.module.scss";
import CartItem from "./components/CartItem/CartItem";
import { BotRequestPayload } from "../../models/BotRequestPayload";

const Cart: FC = () => {
  const priceFormatter = priceFormatterFactory("ru-RU", { currency: "RUB" });
  const { quantityChanging, getCartData, createOrder } = cartStore;
  const { cartData, isLoading, redirecting } = cartStore;
  const queryParam = useQuery();

  const orderPayload: BotRequestPayload = {
    get_params: {
      base_url: "https://designer.fstrk.io/",
      bot_key: queryParam.get("bot_key"),
      cart_variable: `cart-${queryParam.get("ecommerce")}`,
      chat_uuid: queryParam.get("chat_uuid"),
      ecommerce: queryParam.get("ecommerce"),
      ecommerce_url: queryParam.get("ecommerce_url"),
      is_async: false,
      on_clear_node: null,
      on_close_url: queryParam.get("on_close_url"),
      on_success_node: queryParam.get("on_success_node"),
      primary_color: queryParam.get("primary_color"),
      widget_origin: null,
    },
    is_async: false,
    node: queryParam.get("on_success_node"),
  };

  const {
    chat_uuid: chatId,
    bot_key: botKey,
    on_close_url: onCloseUrl,
  } = orderPayload.get_params;

  useEffect(() => {
    getCartData(chatId, botKey);
  }, [botKey, chatId, getCartData]);

  if (redirecting) {
    return (
      <Redirect
        to={{
          pathname: "/redirect_page",
          state: {
            externalLink: onCloseUrl,
          },
        }}
      />
    );
  }
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  const cartSum =
    cartData?.products.reduce((acc, current) => {
      return acc + (current.discount_price || current.price) * current.quantity;
    }, 0) || 0;
  const cartItems = cartData?.products.map((product) => (
    <CartItem
      key={product.guid}
      quantityChanging={quantityChanging}
      itemData={product}
      priceFormatter={priceFormatter}
    />
  )) || <Typography variant="h5"> Корзина пуста</Typography>;

  return (
    <Box>
      <Box className={s.cartHeader}>
        <Typography variant="h5">
          Корзина {cartData?.products.length}
        </Typography>
        <Typography>{priceFormatter.format(cartSum)}</Typography>
      </Box>
      <Divider />
      {cartItems}
      <Box className={s.orderButtons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createOrder(orderPayload)}
          style={{ marginBottom: 10 }}
        >
          Оформить заказ
        </Button>
        <Button
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log("remove all");
          }}
        >
          Очистить корзину
        </Button>
      </Box>
    </Box>
  );
};

export default observer(Cart);
