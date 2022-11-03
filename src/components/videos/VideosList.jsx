import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Video from './Video';


const rows = new Array(25)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 100))

export default function VideosList({ videos }) {

  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: videos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 500,
  });

  console.log(rowVirtualizer.options)
  return (
    <div
      ref={parentRef}
      style={{
        height: `100%`,
        width: `100%`,
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {
          rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Video index={virtualRow.index} video={videos[virtualRow.index]} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
