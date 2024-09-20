import { eventTestData } from '@/constants/eventtest';
import { missionTestData } from '@/constants/missiontest';

import MissionDetailPageContent from './page.client';

export default function MissionDetailPage() {
  return <MissionDetailPageContent mission={{ ...missionTestData, event: eventTestData, holders: [] }} />;
}
