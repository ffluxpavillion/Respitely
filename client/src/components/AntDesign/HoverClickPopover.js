import React, { useState } from 'react';
import { Button, Popover } from 'antd';

const hoverClickPopover = ({ defaultText, hoverTitle, hoverText, clickTitle, clickText }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hide = () => {
    setClicked(false);
    setHovered(false);
  };
  const handleHoverChange = (open) => {
    setHovered(open);
    setClicked(false);
  };
  const handleClickChange = (open) => {
    setHovered(false);
    setClicked(open);
  };
  const hoverContent = <div>{hoverText}</div>;
  const clickContent = <div>{clickText}</div>;
  return (
    <Popover
      style={{
        width: 500,
      }}
      content={hoverContent}
      title={hoverTitle}
      trigger="hover"
      open={hovered}
      onOpenChange={handleHoverChange}
    >
      <Popover
        content={
          <div>
            {clickContent}
            <a onClick={hide}>Close</a>
          </div>
        }
        title={clickTitle}
        trigger="click"
        open={clicked}
        onOpenChange={handleClickChange}
      >
        <Button>{defaultText}</Button>
      </Popover>
    </Popover>
  );
};
export default hoverClickPopover;
