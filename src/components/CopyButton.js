import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';

import { Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import { Types, WeekTasksDispatch } from '../utils/constants';

function CopyButton({ dayIndex, ...restProps }) {
  const dispatch = useContext(WeekTasksDispatch);

  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: Types.LIST,
      index: dayIndex,
    },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return
      }

      // When dropped on a compatible target, do something
      const dropResult = monitor.getDropResult()

      dispatch({
        type: 'copy',
        payload: {
          sourceIndex: item.index,
          targetIndex: dropResult.index,
        },
      });
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Button ref={dragRef} style={{ opacity }} {...restProps}>
      <CopyOutlined /> Copy
    </Button>
  );
}

export default CopyButton;
