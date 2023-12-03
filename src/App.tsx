import React, { useState } from 'react';
import Tab from './components/Tab';
import Tabs from './components/Tabs';
import styled from 'styled-components';

function App() {
  const [value, setValue] = useState("Home");

  return (
    <Container>
      <Tabs value={value}>
        {menus.map((menu) => (
          <Tab
            key={menu}
            value={menu}
            onClick={() => setValue(menu)}
          >
            {menu}
          </Tab>
        ))}
      </Tabs>
    </Container >
  );
}

const menus = ['Home', 'Service', 'Contact', 'About'];

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App;
