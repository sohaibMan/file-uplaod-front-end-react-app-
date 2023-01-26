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
      const res = await fetch(
        "http://localhost:8080/api/v1/uploads?categorie=images", //images or video or audio
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      // console.log(
      //   "🚀 ~ file: IconLabelButtons.jsx:33 ~ sendHanlder ~ res",
      //   res
      // );

      if (data.status === "fail")
        throw new Error(data.message + " " + "<server error>");
      props.onHide({
        type: "success",
        message: "Sent",
      });
      console.log(
        "🚀 ~ file: IconLabelButtons.jsx:30 ~ sendHanlder ~ data",
        data
      );

      //todo add error handling
      //todo add a spinner
      //?info  the message of confirmation is not showing
    } catch (e) {
      console.log(e);
      return props.onHide({ type: "error", message: e.message });
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
