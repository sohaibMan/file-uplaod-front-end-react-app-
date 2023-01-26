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

      // console.log(
      //   "🚀 ~ file: IconLabelButtons.jsx:18 ~ sendHanlder ~ imgs",
      //   imgs
      // );
      // !post request
      const formData = new FormData();
      props.imgs.forEach((file) => formData.append(file.name, file.imgData));
      const res = await fetch(
        "http://localhost:8080/api/v1/uploads?categorie=images",
        {
          method: "POST",
          body: formData,
        }
      );
      // !put request(respect this formula)
      // const res = await fetch(
      //   "http://localhost:8080/api/v1/uploads?categorie=images",
      //   {
      //     method: "PUT",
      //     body: formData,
      //     headers: {
      //       "file-url":
      //         "https://findit.blob.core.windows.net/images/testimages099c7a00-9cef-11ed-86eb-35cb833df65e1png2ba3ba50-9cfe-11ed-9d85-a57fa5c7bf6dpngfee748f0-9cfe-11ed-bdef-4905d67e8e58png1060a250-9d01-11ed-a132-89f192a384f6png95878c50-9d01-11ed-a132-89f192a384f6.png28de7800-9d7b-11ed-a767-d1e9c4efb080.png",
      //     },
      //   }
      // );
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
