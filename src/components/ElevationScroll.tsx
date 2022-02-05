import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react';

const scrollStyles: SxProps<Theme> = {
  position: 'sticky',
  zIndex: (theme: Theme) => theme.zIndex.appBar - 1,
  top: (theme: Theme) =>
    `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(1)})`,
  boxShadow: 3,
};

function ElevationScroll({ children }: { children: React.ReactNode }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      m={-3}
      mb={3}
      p={2}
      bgcolor="white"
      boxShadow={1}
      sx={trigger ? scrollStyles : {}}
    >
      {children}
    </Box>
  );
}

export default ElevationScroll;
