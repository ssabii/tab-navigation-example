import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo
} from 'react'
import styled from 'styled-components'
import { TabProps } from './Tab'

interface TabsProps {
  value?: number | string;
}

function Tabs({ value, children: childrenProp }: PropsWithChildren<TabsProps>) {
  const [indicatorStyle, setIndicatorStyle] = React.useState({});
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const valueToIndex = useMemo(() => new Map(), []);

  const indicator = <Indicator style={{ ...indicatorStyle }} />

  let childIndex = 0;
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    const childValue = child.props.value === undefined
      ? childIndex
      : child.props.value;
    const selected = value === childValue;
    valueToIndex.set(childValue, childIndex);
    childIndex += 1;

    return React.cloneElement<TabProps>(child as ReactElement<TabProps>, {
      value: childValue,
      selected,
    });
  })

  const getTabsMeta = useCallback(() => {
    const tabsNode = tabsRef.current;
    const tabNode = tabListRef.current?.children[valueToIndex.get(value)];

    let tabsMeta = { left: 0 };
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();

      tabsMeta = { left: rect.left }
    }

    let tabMeta = {
      left: 0,
      clientWidth: 0,
    };
    if (tabNode) {
      const rect = tabNode.getBoundingClientRect();

      tabMeta = {
        left: rect.left,
        clientWidth: tabNode.clientWidth,
      }
    }

    return {
      tabsMeta,
      tabMeta,
    }
  }, [value, valueToIndex])

  const updateIndicatorState = useCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    const startValue = tabMeta?.left - tabsMeta?.left;

    setIndicatorStyle({
      left: startValue,
      width: tabMeta.clientWidth
    })
  }, [getTabsMeta])

  React.useEffect(() => {
    updateIndicatorState();
  }, [updateIndicatorState])

  return (
    <TabsRoot ref={tabsRef}>
      <FlexContainer ref={tabListRef}>
        {children}
      </FlexContainer>
      {indicator}
    </TabsRoot>
  )
}

const TabsRoot = styled.div`
  position: relative;
  align-items: center;
`

const FlexContainer = styled.div`
  display: flex;
`

const Indicator = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: black;
  transition: left .3s;
`;

export default Tabs