import { Avatar, Box, Typography } from "@material-ui/core";
import React, { FC } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { Product } from "../../Cart.dto";
import s from "./CartItem.module.scss";
import ButtonWithIcon from "../../../../components/ButtonWithIcon";

interface Props {
  itemData: Product;
  priceFormatter: Intl.NumberFormat;
  quantityChanging: (
    guid: string,
    changingAction: "remove" | "add" | "delete"
  ) => void;
}
const CartItem: FC<Props> = (props) => {
  const { itemData, priceFormatter, quantityChanging } = props;
  const {
    image,
    price,
    discount_price: discountPrice,
    title,
    quantity,
    field_multichoice: fieldMultichoice,
    guid,
  } = itemData;

  const moreButton = (
    <ButtonWithIcon
      icon={AddIcon}
      onClick={() => quantityChanging(guid, "add")}
    />
  );

  const lessButton =
    quantity > 1 ? (
      <ButtonWithIcon
        style={{ marginRight: 10 }}
        icon={RemoveIcon}
        onClick={() => quantityChanging(guid, "remove")}
      />
    ) : (
      <ButtonWithIcon
        style={{ marginRight: 10 }}
        icon={DeleteForeverIcon}
        onClick={() => quantityChanging(guid, "delete")}
      />
    );

  const prices = (discountPrice && (
    <Box className={s.discountPrice}>
      <Typography style={{ marginRight: 10 }}>
        {priceFormatter.format(discountPrice)}
      </Typography>
      <Typography
        style={{ textDecoration: "line-through", color: "rgb(139 139 139)" }}
      >
        {priceFormatter.format(price)}
      </Typography>
    </Box>
  )) || <Typography>{priceFormatter.format(price)}</Typography>;

  return (
    <Box className={s.item}>
      <Box className={s.itemInfo}>
        <Avatar
          style={{ height: 100, width: 100, marginRight: 10 }}
          variant="square"
          src={image}
        />
        <Box className={s.itemDescription}>
          <Typography>{title}</Typography>
          <Typography>Размер: {fieldMultichoice[0]}</Typography>
          {prices}
        </Box>
      </Box>
      <Box className={s.itemQuantity}>
        {lessButton}
        <Typography style={{ marginRight: 10 }}>{quantity}</Typography>
        {moreButton}
      </Box>
    </Box>
  );
};

export default CartItem;
