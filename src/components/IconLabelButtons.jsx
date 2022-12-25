import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

// import { Box } from "@mui/material";

export default function IconLabelButtons(props) {
  const deleteHanlder = () => {
    props.onHide({
      type: "error",
      message: "Deleted",
    });
  };
  const sendHanlder = async () => {
    try {
      props.onHide({
        type: "info",
        message: "please waiting your message in being sent",
      });
      const imgs = props.imgs;
      // console.log(
      //   "🚀 ~ file: IconLabelButtons.jsx:18 ~ sendHanlder ~ imgs",
      //   imgs
      // );
      const formData = new FormData();
      props.imgs.forEach((file) => formData.append(file.name, file.imgData));
      const res = await fetch("http://localhost:8080/api/v1/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(
        "🚀 ~ file: IconLabelButtons.jsx:34 ~ sendHanlder ~ data",
        data
      );
      if (data.status === "fail") {
        props.onHide({ type: "error", message: data.data.error });
      } else {
        props.onHide({
          type: "success",
          message: "Sent",
        });
      }

      //todo add error handling
      //todo add a spinner
      //?info  the message of confirmation is not showing
    } catch (e) {
      console.log(e);
      // if (data.status === "fail")
      // return props.onHide({ typeof: "error", message: data.message });
    }
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={deleteHanlder}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button onClick={sendHanlder} variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
  );
}
