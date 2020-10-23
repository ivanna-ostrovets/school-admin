import { createStyles, makeStyles, Theme } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'sticky',
      zIndex: theme.zIndex.appBar - 1,
      top: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(1)})`,
      boxShadow: theme.shadows[3],
    },
  }),
);

function ElevationScroll({ children }: { children: React.ReactElement }) {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    className: clsx(children.props.className, trigger && classes.root),
  });
}

export default ElevationScroll;
