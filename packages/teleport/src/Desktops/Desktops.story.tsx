/*
Copyright 2021 Gravitational, Inc.

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
import { State } from './useDesktops';
import { Desktops } from './Desktops';

export default {
  title: 'Teleport/Desktops',
};

export const Loading = () => (
  <Desktops {...props} attempt={{ status: 'processing' }} />
);

export const Loaded = () => <Desktops {...props} />;

export const Empty = () => <Desktops {...props} desktops={[]} />;

export const Failed = () => (
  <Desktops
    {...props}
    attempt={{ status: 'failed', statusText: 'Server Error' }}
  />
);

const props: State = {
  desktops: [
    {
      os: 'windows',
      name: 'bb8411a4-ba50-537c-89b3-226a00447bc6',
      addr: 'host.com',
      tags: ['foo: bar'],
    },
    {
      os: 'windows',
      name: 'bb8411a4-ba50-537c-89b3-226a00447bc6',
      addr: 'another.com',
      tags: [],
    },
  ],
  attempt: { status: 'success' },
  username: 'user',
  clusterId: 'im-a-cluster',
  searchValue: '',
  setSearchValue: () => {},
  getWindowsLoginOptions: (desktopId: string) => [{ login: '', url: '' }],
  openRemoteDesktopWindow: (username: string, desktopId: string) => {},
};