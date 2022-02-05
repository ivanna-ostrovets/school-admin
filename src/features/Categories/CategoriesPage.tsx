import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import firebase from 'firebase';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { TreeItem as TreeItemType } from 'react-sortable-tree';
import { DB_KEY } from '../../databaseKeys';

export interface Category {
  id: string;
  title: string;
  children?: string[];
  parentId?: string;
}

type TreeItem = TreeItemType<{ id?: string }>;

// TODO: fix sortable tree

function CategoriesPage() {
  const [newMenuItem, setNewMenuItem] = useState('');
  const [menuItems, setMenuItems] = useState<TreeItem[]>([]);
  const [dbMenuItems, setDbMenuItems] = useState<{
    [key: string]: Category;
  }>({});
  const [editedItemId, setEditedItemId] = useState('');
  const [editedItem, setEditedItem] = useState('');

  useEffect(() => {
    firebase
      .database()
      .ref(DB_KEY.menuItems)
      .on('value', snapshot => {
        setDbMenuItems(snapshot.val() || {});
      });
  }, []);

  useEffect(() => {
    const initialMenuItems: TreeItem[] = [];

    if (!dbMenuItems) return;

    const transformFromBackend = (menuItem: Category): TreeItem => ({
      ...menuItem,
      children:
        menuItem.children?.map(id => transformFromBackend(dbMenuItems[id])) ||
        [],
      expanded: true,
    });

    for (const menuItem of Object.values(dbMenuItems)) {
      if (menuItem.parentId) continue;

      initialMenuItems.push(transformFromBackend(menuItem));
    }

    setMenuItems(initialMenuItems);
  }, [dbMenuItems]);

  const addMenuItem = async () => {
    if (!newMenuItem) return;

    const newId = firebase.database().ref().child(DB_KEY.menuItems).push().key;

    await firebase
      .database()
      .ref()
      .update({
        [`${DB_KEY.menuItems}/${newId}`]: { title: newMenuItem, id: newId },
      });

    setNewMenuItem('');
  };

  const handleInputKeyPress = async ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      await addMenuItem();
    }
  };

  const saveOrder = () => {
    const updates: { [key: string]: Category } = {};

    const addChildrenUpdates = (parentId: string, item: TreeItem) => {
      if (!item.children) return;

      const children: string[] = [];

      for (const child of item.children as TreeItem[]) {
        const newChildId =
          child.id ||
          firebase.database().ref().child(DB_KEY.menuItems).push().key;

        if (!newChildId) continue;

        children.push(newChildId);

        updates[`${DB_KEY.menuItems}/${newChildId}`] = {
          title: child.title as string,
          id: newChildId,
          parentId,
        };

        addChildrenUpdates(newChildId, child);
      }

      if (!children.length) return;

      updates[`${DB_KEY.menuItems}/${parentId}`] = {
        ...updates[`${DB_KEY.menuItems}/${parentId}`],
        children,
      };
    };

    for (const menuItem of menuItems) {
      const newId =
        menuItem.id ||
        firebase.database().ref().child(DB_KEY.menuItems).push().key;

      if (!newId) return;

      updates[`${DB_KEY.menuItems}/${newId}`] = {
        title: menuItem.title as string,
        id: newId,
      };

      addChildrenUpdates(newId, menuItem);
    }

    return firebase.database().ref().update(updates);
  };

  const removeMenuItem = (itemToRemove: TreeItem) => {
    const updates: { [key: string]: Category | null } = {};

    for (const dbItem of Object.values(dbMenuItems)) {
      updates[`${DB_KEY.menuItems}/${dbItem.id}`] =
        dbItem.id === itemToRemove.id
          ? null
          : {
              ...dbItem,
              children:
                dbItem.children?.filter(id => id !== itemToRemove.id) || [],
            };
    }

    const getChildrenUpdates = (item: TreeItem) => {
      for (const child of item.children as TreeItem[]) {
        updates[`${DB_KEY.menuItems}/${child.id}`] = null;
        getChildrenUpdates(child);
      }
    };

    getChildrenUpdates(itemToRemove);

    return firebase.database().ref().update(updates);
  };

  const editMenuItem = async (itemToEdit: TreeItem) => {
    const updates = {
      [`${DB_KEY.menuItems}/${itemToEdit.id}`]: {
        ...itemToEdit,
        title: editedItem,
        children: (itemToEdit?.children as TreeItem[]).map(child => child.id),
      },
    };

    await firebase.database().ref().update(updates);
    cancelEditing();
  };

  const cancelEditing = () => {
    setEditedItemId('');
    setEditedItem('');
  };

  const getEditButtons = (menuItem: TreeItem) => [
    <IconButton onClick={() => editMenuItem(menuItem)}>
      <DoneIcon />
    </IconButton>,
    <IconButton onClick={cancelEditing}>
      <HighlightOffIcon />
    </IconButton>,
  ];

  const getActionButtons = (menuItem: TreeItem) => [
    <IconButton
      onClick={() => {
        // TODO: fix ts ignore
        // @ts-ignore
        setEditedItemId(menuItem.id);
        setEditedItem(menuItem.title as string);
      }}
    >
      <EditIcon />
    </IconButton>,
    <IconButton onClick={() => removeMenuItem(menuItem)}>
      <DeleteIcon />
    </IconButton>,
  ];

  return (
    <>
      <Box mb={3} display="flex" justifyContent="space-between">
        <TextField
          label="Пункт меню"
          variant="outlined"
          sx={{
            width: '100%',
            mr: 2,
          }}
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

      {/*{menuItems.length > 0 && (*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      height: 750,*/}
      {/*      '@global': {*/}
      {/*        '.ReactVirtualized__Grid': {*/}
      {/*          outline: 'none !important',*/}
      {/*        },*/}
      {/*        '.rstcustom__highlight': {*/}
      {/*          background: 'none !important',*/}
      {/*        },*/}
      {/*        '.rstcustom__node': {*/}
      {/*          height: '62px !important',*/}
      {/*        },*/}
      {/*        '.rstcustom__nodeContent': {*/}
      {/*          width: '100%',*/}
      {/*        },*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <SortableTree*/}
      {/*      treeData={menuItems}*/}
      {/*      onChange={setMenuItems}*/}
      {/*      onMoveNode={saveOrder}*/}
      {/*      theme={SortableTreeTheme}*/}
      {/*      getNodeKey={({ node, treeIndex }) => node?.id || treeIndex}*/}
      {/*      generateNodeProps={({ node }) => ({*/}
      {/*        buttons:*/}
      {/*          editedItemId === node?.id*/}
      {/*            ? getEditButtons(node)*/}
      {/*            : getActionButtons(node),*/}
      {/*        isEdited: editedItemId === node?.id,*/}
      {/*        editedItem,*/}
      {/*        setEditedItem,*/}
      {/*      })}*/}
      {/*      nodeContentRenderer={props => <CategoryItem {...props} />}*/}
      {/*    />*/}
      {/*  </Box>*/}
      {/*)}*/}
    </>
  );
}

export default CategoriesPage;
