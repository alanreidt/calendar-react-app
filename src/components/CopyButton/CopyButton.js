import React from 'react';
import { useDrag } from 'react-dnd';

import { Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import { Types } from '../../utils/constants';

const CopyButton = ({ id, onCopyButtonDrop }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: Types.LIST, id },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return
      }

      // When dropped on a compatible target, do something
      const dropResult = monitor.getDropResult()

      onCopyButtonDrop(item.id, dropResult.id);
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Button ref={dragRef} style={{ opacity }}>
      <CopyOutlined />
    </Button>
  );
}

export default CopyButton;
