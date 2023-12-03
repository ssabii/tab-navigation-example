import React, { HTMLAttributes, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

export interface TabProps extends HTMLAttributes<HTMLAnchorElement> {
  value?: number | string;
  selected?: boolean;
}

function Tab({ children, ...rest }: PropsWithChildren<TabProps>) {
  return (
    <TabRoot
      {...rest}
    >
      {children}
    </TabRoot>
  )
}


const TabRoot = styled.a<TabProps>`
  position: relative;
  padding: 12px 16px;
  text-decoration: none;
  font-weight: 700;
  color: #343434;
  transition: color .3s;
  cursor: pointer;

  &:hover {
    color: rgba(15, 15, 15, 0.3);
  }

  ${({ selected }) => selected && css`
    color: #121212;
  `};
`

export default Tab