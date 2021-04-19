import { useContext, useState } from "react";
import { GlobalContextType, GlobalContext } from "services/GlobalContext";

export const usePhotoSource = (key: string) => {
  const { serverUrl, serverKey } = useContext<GlobalContextType>(GlobalContext);
  const [image, setImage] = useState("");

  fetch(`${serverUrl}/api/files/thumbnail/${key}`, {
    method: "GET",
    headers: {
      Authorization: serverKey,
    },
  })
    .then((res) => res.blob())
    .then((blob) => {
      setImage(URL.createObjectURL(blob));
    });

  return image;
};
