import { useEffect, useState } from "react";
import { FilesResponse } from "types/FileTypes";

export const useFiles = (
  serverUrl: string,
  serverKey: string,
  cursor: string | undefined
) => {
  const [data, setData] = useState<FilesResponse>();

  useEffect(() => {
    const cursorUrlParam = cursor ? `cursor=${cursor}&` : "";
    const limitParam = "limit=1000";

    if (serverUrl !== "" && serverKey !== "") {
      fetch(`${serverUrl}/api/files?${cursorUrlParam}${limitParam}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: serverKey,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setData(json);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setData({
        nextCursor: "",
        nodes: [],
      });
    }
  }, [cursor, serverUrl, serverKey]);

  return data;
};
