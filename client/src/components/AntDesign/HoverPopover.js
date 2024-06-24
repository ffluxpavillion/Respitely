import React from 'react';
import { Button, Popover } from 'antd';

export default function HoverPopover({
  content,
  title,
  buttonText,
  contentClassName,
  buttonClassName,
}) {
  return (
    <Popover
      content={content}
      title={title}
      overlayClassName={contentClassName}
    >
      <Button className={buttonClassName} type='primary'>
        {buttonText}
      </Button>
    </Popover>
  );
}
