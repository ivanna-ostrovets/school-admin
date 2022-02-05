import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import React from 'react';

function ScrollToAnchor({ anchorId }: { anchorId: string }) {
  const trigger = useScrollTrigger({ disableHysteresis: true });

  const handleClick = () => {
    const anchor = document.querySelector(`#${anchorId}`);

    if (!anchor) return;

    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="secondary"
        size="small"
        aria-label="scroll back to top"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          right: theme => theme.spacing(2),
          bottom: theme => theme.spacing(2),
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}

export default ScrollToAnchor;
