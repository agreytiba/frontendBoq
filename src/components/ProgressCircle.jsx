import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "1", size = "60",icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.blueAccent[100]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
           #3498db`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
      display="flex" justifyContent="center" alignItems="center"
    >
      <Box fontSize="20px" >
          {icon}
      </Box>
      
      </Box>
  );
};

export default ProgressCircle;
