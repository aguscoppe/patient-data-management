import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useScreenSize = () => {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("lg"));
  const isLg = useMediaQuery(theme.breakpoints.between("xl", "lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("lg", "md"));
  const isSm = useMediaQuery(theme.breakpoints.between("md", "xs"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isScreenSizeSmall = isSm || isXs;

  return {
    isXl,
    isLg,
    isMd,
    isSm,
    isXs,
    isScreenSizeSmall,
  };
};

export default useScreenSize;
