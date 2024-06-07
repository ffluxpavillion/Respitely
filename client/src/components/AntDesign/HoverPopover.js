import React from 'react';
import { Button, Popover } from 'antd';

export default function HoverPopover({ content, title, buttonText }) {
  return (
    <Popover content={content} title={title}>
      <Button type='primary'>{buttonText}</Button>
    </Popover>
  );
}
