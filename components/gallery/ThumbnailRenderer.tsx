import React, { useContext, useEffect, useState } from "react";
import { RenderImageProps } from "react-photo-gallery";
import { GlobalContextType, GlobalContext } from "services/GlobalContext";

export type ThumbnailRendererProps = {
  details: RenderImageProps;
};

export const ThumbnailRenderer: React.FunctionComponent<ThumbnailRendererProps> = ({
  details,
}) => {
  const { serverUrl, serverKey } = useContext<GlobalContextType>(GlobalContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`${serverUrl}/api/files/thumbnail/${details.photo.key}`, {
      method: "GET",
      headers: {
        Authorization: serverKey,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        setImage(URL.createObjectURL(blob));
      });
  }, [serverUrl, serverKey]);

  return (
    <img
      src={image}
      onClick={(event) =>
        details.onClick &&
        details.onClick(event, {
          ...details.photo,
          ...{ index: details.index },
        })
      }
      style={{
        height: details.photo.height,
        width: details.photo.width,
      }}
    />
  );
};
