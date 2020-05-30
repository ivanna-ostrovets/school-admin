import {
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import React, { KeyboardEvent, useState } from 'react';
import SortableTree, { TreeItem } from 'react-sortable-tree';
import SortableTreeTheme from 'react-sortable-tree-theme-minimal';
import './sortableTreeOverrides.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createMenuItemInput: {
      width: '100%',
      marginRight: theme.spacing(2),
    },
    menuItemsTree: {
      height: 750,
    },
  }),
);

function MenuItems() {
  const classes = useStyles();
  const [newMenuItem, setNewMenuItem] = useState('');
  const [menuItems, setMenuItems] = useState<TreeItem[]>([]);

  const addMenuItem = () => {
    if (!newMenuItem) return;

    setMenuItems(prevMenuItems => [...prevMenuItems, { title: newMenuItem }]);
    setNewMenuItem('');
  };

  const handleInputKeyPress = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      addMenuItem();
    }
  };

  return (
    <>
      <Box mb={3} display="flex" justifyContent="space-between">
        <TextField
          id="outlined-basic"
          label="Пункт меню"
          variant="outlined"
          className={classes.createMenuItemInput}
          value={newMenuItem}
          onChange={e => setNewMenuItem(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={addMenuItem}
          disabled={!newMenuItem}
        >
          Додати
        </Button>
      </Box>

      {menuItems.length > 0 && (
        <>
          <Divider />

          <Box my={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRoundedIcon />}
            >
              Зберегти порядок меню
            </Button>
          </Box>

          <div className={classes.menuItemsTree}>
            <SortableTree
              treeData={menuItems}
              onChange={setMenuItems}
              theme={SortableTreeTheme}
            />
          </div>
        </>
      )}
    </>
  );
}

export default MenuItems;
