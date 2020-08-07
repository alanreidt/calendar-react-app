import React from 'react';
import { useDrop } from 'react-dnd';

const Types = {
  LIST: 'list',
};

const DayTab = ({ id, text }) => {
  const [, dropRef] = useDrop({
    accept: Types.LIST,
    drop: (item, monitor) => ({
      id,
    }),
  });

  return (
    <span ref={dropRef}>{text}</span>
  );
}

export default DayTab;
