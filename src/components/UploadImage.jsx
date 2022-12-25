import * as React from "react";
import IconLabelButtons from "./IconLabelButtons";
import UploadButtons from "./UploadButtons";
import { Box } from "@mui/system";
import ImageList from "./ImageList";
import Alert from "./Alert";

export default function UploadImage() {
  const [isUploaded, setisUploaded] = React.useState([]);
  // console.log(
  //   "🚀 ~ file: UploadImage.jsx:10 ~ UploadImage ~ isUploaded",
  //   isUploaded
  // );
  const [alert, setAlert] = React.useState({});
  const UploadHanlder = (files, al) => {
    setisUploaded(files);
    setAlert(al);
  };
  const HideHanlder = (al) => {
    setisUploaded([]);
    setAlert(al);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "10px",
      }}
    >
      <UploadButtons onUpload={UploadHanlder} />
      {isUploaded.length ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "10px",
          }}
        >
          <ImageList imgs={isUploaded} />
          <IconLabelButtons imgs={isUploaded} onHide={HideHanlder} />
        </Box>
      ) : (
        <></>
      )}
      {!!alert?.type ? (
        <Alert type={alert.type} message={alert.message} />
      ) : (
        <></>
      )}
    </Box>
  );
}
