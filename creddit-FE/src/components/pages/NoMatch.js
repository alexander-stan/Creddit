import * as React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar'

const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

export const NoMatch = () => (
  <>
    <Sidebar />
    <Wrapper>
      <p>No Match</p>
    </Wrapper>
  </>
)