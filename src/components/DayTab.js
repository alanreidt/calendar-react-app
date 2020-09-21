import React from 'react';
import { useDrop } from 'react-dnd';

import { Types } from '../utils/constants';

function DayTab({ dayIndex, text }) {
  const [, dropRef] = useDrop({
    accept: Types.LIST,
    drop: (item, monitor) => ({
      index: dayIndex,
    }),
  });

  return (
    <span ref={dropRef}>{text}</span>
  );
}

export default DayTab;
