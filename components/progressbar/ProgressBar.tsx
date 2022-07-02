import React from "react";

interface ProgressBarProps {
  progress: number;
}

const containerStyles = {
  height: 20,
  width: "100%",
  backgroundColor: "#e0e0de",
  borderRadius: 50,
  margin: 50,
};

const labelStyles = {
  padding: 5,
  color: "white",
  fontWeight: 100,
};

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  progress,
}) => {
  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#ffb703",
    borderRadius: "inherit",
    "text-align": "right",
  };
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress}%`}</span>
      </div>
    </div>
  );
};
