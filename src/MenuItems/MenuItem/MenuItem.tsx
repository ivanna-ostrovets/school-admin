import { Input } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React from 'react';
import { isDescendant, NodeRendererProps } from 'react-sortable-tree';
import styles from './MenuItems.module.css';

interface Props extends NodeRendererProps {
  isEdited?: boolean;
  editedItem?: string;
  setEditedItem?: (value: string) => void;
}

function MenuItem(props: Props) {
  const {
    isEdited,
    editedItem,
    setEditedItem,
    scaffoldBlockPxWidth,
    toggleChildrenVisibility,
    connectDragPreview,
    connectDragSource,
    isDragging,
    canDrop,
    canDrag,
    node,
    title,
    subtitle,
    draggedNode,
    path,
    treeIndex,
    isSearchMatch,
    isSearchFocus,
    icons,
    buttons,
    className,
    style,
    didDrop,
    swapFrom,
    swapLength,
    swapDepth,
    treeId,
    isOver,
    parentNode,
    rowDirection,
    ...otherProps
  } = props;
  const nodeTitle = title || node.title;

  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;

  const nodeContent = connectDragPreview(
    <div className={styles.rowContents}>
      <div className={styles.rowLabel}>
        {isEdited ? (
          <Input
            fullWidth
            autoFocus
            value={editedItem}
            error={!editedItem?.length}
            onChange={event => {
              if (!setEditedItem) return;

              setEditedItem(event.target.value);
            }}
          />
        ) : (
          <span className={styles.rowTitle}>{nodeTitle}</span>
        )}
      </div>

      <div className={styles.rowToolbar}>
        {buttons?.map((btn, index) => (
          <div key={`action-button--${nodeTitle}-${index}`}>{btn}</div>
        ))}
      </div>
    </div>,
  );

  return (
    <div style={{ height: '100%' }} {...otherProps}>
      {toggleChildrenVisibility && node.children && node.children.length > 0 && (
        <div>
          {node.expanded ? (
            <ExpandLessIcon
              className={styles.collapseButton}
              onClick={() =>
                toggleChildrenVisibility({
                  node,
                  path,
                  treeIndex,
                })
              }
            />
          ) : (
            <ExpandMoreIcon
              className={styles.expandButton}
              onClick={() =>
                toggleChildrenVisibility({
                  node,
                  path,
                  treeIndex,
                })
              }
            />
          )}

          {node.expanded && !isDragging && (
            <div
              style={{ width: scaffoldBlockPxWidth }}
              className={styles.lineChildren}
            />
          )}
        </div>
      )}

      <div
        className={clsx(
          styles.rowWrapper,
          !canDrag && styles.rowWrapperDragDisabled,
        )}
      >
        <div
          className={clsx(
            styles.row,
            isLandingPadActive && !canDrop && styles.rowCancelPad,
          )}
          style={{
            opacity: isDraggedDescendant ? 0.5 : 1,
            paddingLeft: scaffoldBlockPxWidth,
            ...style,
          }}
        >
          {!isEdited && canDrag
            ? connectDragSource(nodeContent, { dropEffect: 'copy' })
            : nodeContent}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
