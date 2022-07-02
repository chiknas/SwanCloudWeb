import { useCallback, useContext, useState } from "react";
import { GlobalContextType, GlobalContext } from "../services/GlobalContext";

export const useUploadFiles = (): [
  upload: (files: FileList | null) => void,
  progress: number,
  uploading: boolean
] => {
  const { serverUrl, serverKey } = useContext<GlobalContextType>(GlobalContext);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const upload = useCallback(
    async (files: FileList | null) => {
      if (!serverUrl || !serverKey || !files) {
        return;
      }
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        const data = new FormData();

        data.append("data", files[i]);

        const response = await fetch(`${serverUrl}/api/upload`, {
          method: "POST",
          body: data,
          headers: {
            Authorization: serverKey,
          },
        }).catch((error) => {
          console.error(error);
        });

        setProgress(Math.round((i / files.length) * 100));

        if (response && response.status !== 200) {
          alert(`Upload of file ${files[i].name} failed.`);
          break;
        }
      }

      setUploading(false);
      setProgress(0);
    },
    [serverUrl, serverKey]
  );

  return [upload, progress, uploading];
};
