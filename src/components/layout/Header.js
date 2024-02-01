import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = () => {
  return (
      <Appbar.Header 
      mode='center-aligned'
      style={{backgroundColor:'#2c3e50'}}
      >
        <Appbar.Content 
        title="Movies App" 
        style={{ alignItems: 'center'}}
        titleStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white'}} 
        />
      </Appbar.Header>
  );
}

export default Header;

