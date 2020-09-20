import React, { FC } from "react";
import { Route } from "react-router-dom";

interface Props {
  exact?: boolean;
  link: string;
  path: string;
  sensitive?: boolean;
  strict?: boolean;
}

const ExternalRedirect: FC<Props> = (props: Props) => {
  const { link, ...routeProps } = props;

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...routeProps}
      render={() => {
        window.location.replace(props.link);
        return null;
      }}
    />
  );
};
export default ExternalRedirect;
