import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
// import ImageList from "./ImageList";

function UlpoadButtons(props) {
  const uploadRef = React.useRef();
  const uploadHanlder = (e) => {
    const files = Array.from(e.target.files).map((file) => {
      return {
        img: URL.createObjectURL(file),
        name: file.name,
        imgData: file,
      };
    });
    props.onUpload(files);

    // files.forEach((file) => console.log(file));
    // console.log(
    //   "🚀 ~ file: UploadButtons.jsx:15 ~ uploadHanlder ~ files",
    //   files
    // );
    // let files = e.target.files.map((file) => {
    //   return { img: URL.createObjectURL(file), name: file.name };
    // });
    // console.log("🚀 ~ file: UploadButtons.jsx:16 ~ files ~ files", files);
  };
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input
          ref={uploadRef}
          onChange={uploadHanlder}
          hidden
          accept="image/*"
          multiple
          type="file"
          required
        />
      </Button>

      <IconButton color="primary" aria-label="upload picture" component="label">
        <PhotoCamera />
      </IconButton>
    </Stack>
  );
}

export default UlpoadButtons;
