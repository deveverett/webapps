/*
Copyright 2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import styled from 'styled-components';

import { Box, Flex, Text } from 'design';
import { Cross, Info, Warning } from 'design/Icon';

export type Severity = 'info' | 'warning' | 'danger';

export type Props = {
  message: string;
  severity: Severity;
  id: string;
  onClose: (id: string) => void;
};

export function Banner({
  id,
  message = '',
  severity = 'info',
  onClose,
}: Props) {
  const icon = {
    info: <Info mr={3} fontSize="3" role="icon" />,
    warning: <Info mr={3} fontSize="3" role="icon" />,
    danger: <Warning mr={3} fontSize="3" role="icon" />,
  }[severity];

  return (
    <Box bg={severity} p={1} pl={2}>
      <Flex alignItems="center">
        {icon}
        <Text bold>{message}</Text>
        <CloseButton
          onClick={() => {
            onClose(id);
          }}
        >
          <Cross />
        </CloseButton>
      </Flex>
    </Box>
  );
}

const CloseButton = styled.button`
  background: none;
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  padding: 0.5rem;

  :hover {
    background-color: rgb(255, 255, 255, 0.1);
  }
  :focus {
    border: 1px solid rgb(255, 255, 255, 0.1);
  }
`;
