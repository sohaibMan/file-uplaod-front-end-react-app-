import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList(props) {
  // console.log(
  //   "🚀 ~ file: ImageList.jsx:6 ~ StandardImageList ~ props",
  //   props.imgs
  // );
  return (
    <ImageList
      sx={{ width: 500, height: 450 }}
      cols={Math.round(props.imgs.length / 2)}
      rowHeight={164}
    >
      {props.imgs.map((item) => (
        <ImageListItem key={item.img}>
          <img src={item.img} srcSet={item.im} alt={item.name} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
