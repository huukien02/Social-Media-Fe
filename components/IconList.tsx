import React from "react";
import { Box, ListItem, ListItemIcon } from "@mui/material";

const IconList = ({ icons, onItemClick }: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      {icons.map((icon: any, index: any) => (
        <ListItem
          key={index}
          onClick={() => onItemClick(icon)}
          sx={{
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "0px",
              cursor: "pointer",
              color: "yellow",
              "&:hover": {
                transform: "scale(1.3)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            {icon}
          </ListItemIcon>
        </ListItem>
      ))}
    </Box>
  );
};

export default IconList;
