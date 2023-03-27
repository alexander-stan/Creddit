import * as React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar'

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 2em;
  margin-left: 351.708px;
  margin-right: 6em;
  padding-top: 15px;
`;

export const Accounts = () => (
  <>
    <Sidebar />
    <GridWrapper>
      <p>Accounts</p>
    </GridWrapper>
  </>
)