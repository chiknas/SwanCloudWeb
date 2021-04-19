import React, { useContext, useEffect, useState } from "react";
import { ViewType } from "react-images";
import { GlobalContextType, GlobalContext } from "services/GlobalContext";

export type CarouselViewProps = {
  currentIndex?: number;
  innerProps?: { [key: string]: any };
  views?: Array<ViewType>;
};

export const CarouselImageView: React.FunctionComponent<CarouselViewProps> = ({
  currentIndex,
  innerProps,
  views,
}) => {
  const { serverUrl, serverKey } = useContext<GlobalContextType>(GlobalContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`${serverUrl}/api/files/thumbnail/${views[currentIndex].alt}`, {
      method: "GET",
      headers: {
        Authorization: serverKey,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        console.log(views);
        setImage(URL.createObjectURL(blob));
      });
  }, [currentIndex, serverUrl, serverKey]);

  return (
    <div {...innerProps} style={{ width: "100%", height: "auto" }}>
      <img src={image} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};
