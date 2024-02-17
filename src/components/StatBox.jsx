import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="20px 30px" boxShadow="0 4px 12px rgba(0,0,0,0.3)" p="10px" minWidth="230px">
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
