import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" boxShadow="0 4px 12px rgba(0,0,0,0.2)" p="10px" minWidth="200px" padding={`10px`} borderRadius={`10px`}>
      <Box display="flex" justifyContent="space-between" cursor="pointer">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color:  colors.grey[100]}}
          >
            {title}
          </Typography>
        </Box>
        <Box>
        
          <ProgressCircle progress={progress}  icon={icon}/>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.grey[100] }}>
          {subtitle}
        </Typography>
       
      </Box>
    </Box>
  );
};

export default StatBox;
