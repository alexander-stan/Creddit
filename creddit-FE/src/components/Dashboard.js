import * as React from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 2em;
  margin-left: 8em;
  margin-right: 6em;
`;

export const Dashboard = () => (
    <GridWrapper>
        <p>Welcome back!</p>
    </GridWrapper>
)
