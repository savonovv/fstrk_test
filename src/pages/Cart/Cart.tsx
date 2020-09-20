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

const Cart: FC = () => {
  const priceFormatter = priceFormatterFactory("ru-RU", { currency: "RUB" });
  const { quantityChanging, getCartData, createOrder } = cartStore;
  const { cartData, isLoading, redirecting } = cartStore;
  const queryParam = useQuery();

  const chatId = queryParam.get("chat_uuid");
  const botKey = queryParam.get("bot_key");
  const onSuccessNode = queryParam.get("on_success_node");
  const onCloseUrl = queryParam.get("on_close_url");

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
          onClick={() => createOrder(chatId, botKey, onSuccessNode)}
          style={{ marginBottom: 10 }}
        >
          Оформить заказ
        </Button>
        <Button
          onClick={() => {
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

// https://wv.fs5k.com/catalog/
// ?bot_key=c7736d90-a435-4f22-920a-1f5d9ce77fb3
// &on_success_node=48955
// &primary_color=0d92d2
// &ecommerce_url=https://fasttrack-ecom-fashion.flex.fstrk.io
// &ecommerce=8f23fa09-c277-424a-9604-f5dd1c859bea
// &on_close_url=https%3A//refer.id/%3Fbot%3Ddemo_webview_bot%26platform%3Dtelegram%26verbose_name%3D%D0%91%D0%BE%D1%82%20%D0%B4%D0%BB%D1%8F%20%D1%81%D0%BE%D0%B1%D0%B5%D1%81%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B9%26is_close_url%3D1
// &base_url=https%3A//designer.fstrk.io/
// &chat_uuid=8a57e481-108d-4449-9452-d9477bc0eec8
