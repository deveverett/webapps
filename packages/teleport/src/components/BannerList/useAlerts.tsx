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

import { useState, useEffect } from 'react';
import Logger from 'shared/libs/logger';

import { fetchClusterAlerts } from 'teleport/services/alerts';
import useStickyClusterId from 'teleport/useStickyClusterId';

import type { ClusterAlert } from 'teleport/services/alerts';

const logger = Logger.create('ClusterAlerts');

const DISABLED_BANNERS = 'disabledAlerts';
const MS_HOUR = 60 * 60 * 1000;

export function addHours(date: number, hours: number) {
  return date + hours * MS_HOUR;
}

function getItem(key: string): string | null {
  return window.localStorage.getItem(key);
}

function setItem(key: string, data: string) {
  window.localStorage.setItem(key, data);
}

type DismissedAlert = {
  [alertName: string]: string;
};

export function useAlerts() {
  const [alerts, setAlerts] = useState<ClusterAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<DismissedAlert[]>([]);
  const { clusterId } = useStickyClusterId();

  useEffect(() => {
    const disabledAlerts = getItem(DISABLED_BANNERS);
    if (disabledAlerts) {
      // Loop through the existing ones and remove those that have passed 24h.
      const data = JSON.parse(disabledAlerts);
      Object.entries(data).forEach(([name, expiry]: [string, string]) => {
        if (new Date().getTime() > +expiry) {
          delete data[name];
        }
      });
      setDismissedAlerts(data);
      setItem(DISABLED_BANNERS, JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    fetchClusterAlerts(clusterId)
      .then(res => {
        if (!res) {
          return;
        }
        setAlerts(res);
      })
      .catch(err => {
        logger.error(err);
      });
  }, [clusterId]);

  function dismissAlert(name: string) {
    const disabledAlerts = getItem(DISABLED_BANNERS);
    let data = {};
    if (disabledAlerts) {
      data = JSON.parse(disabledAlerts);
    }
    data[name] = addHours(new Date().getTime(), 24);
    setItem(DISABLED_BANNERS, JSON.stringify(data));
  }

  const dismissedAlertNames = Object.keys(dismissedAlerts);

  const visibleAlerts = alerts.filter(
    alert => !dismissedAlertNames.includes(alert.metadata.name)
  );

  return {
    alerts: visibleAlerts,
    dismissAlert,
  };
}
