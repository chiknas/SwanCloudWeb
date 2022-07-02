import useOnScreen from "hooks/useOnHook";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RenderImageProps } from "react-photo-gallery";
import { GlobalContextType, GlobalContext } from "services/GlobalContext";

export type ThumbnailRendererProps = {
  details: RenderImageProps;
};

export const ThumbnailRenderer: React.FunctionComponent<
  ThumbnailRendererProps
> = ({ details }) => {
  const { serverUrl, serverKey } = useContext<GlobalContextType>(GlobalContext);
  const [image, setImage] = useState("");
  const ref = useRef<any>();
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible && serverUrl && serverKey) {
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
    }
  }, [serverUrl, serverKey, isVisible]);

  return (
    <>
      {image ? (
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
      ) : (
        <img
          ref={ref}
          src="/loading.gif"
          style={{
            height: details.photo.height,
            width: details.photo.width,
          }}
        />
      )}
    </>
  );
};
