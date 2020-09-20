import React, { CSSProperties, FC } from "react";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Box, SvgIconTypeMap } from "@material-ui/core";
import s from "./ButtonWithIcon.module.scss";

interface Props {
  style?: CSSProperties;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}
const ButtonWithIcon: FC<Props> = (props) => {
  const { icon: Icon, onClick, style } = props;
  return (
    <Box style={style ?? style} className={s.button} onClick={onClick}>
      <Icon fontSize="small" />
    </Box>
  );
};

export default ButtonWithIcon;
