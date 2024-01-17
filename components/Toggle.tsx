import React, { useState } from "react";
import Switch from "@mui/material/Switch";

const BackgroundSwitch = ({ onToggle }: any) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    onToggle();
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default BackgroundSwitch;
