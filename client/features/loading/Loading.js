import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = ({ message }) => {
  return (
    <div className="">
      <ColorRing
        type="ColorRing"
        color="#7E7F81"
        height={50}
        width={200}
        className="m-5"
      />
      <p className="text-4xl">{message}</p>
    </div>
  );
};

export default Loading;
