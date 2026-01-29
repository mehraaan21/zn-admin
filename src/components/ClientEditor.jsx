'use client';

import dynamic from 'next/dynamic';

const ClientEditor = dynamic(
  () => import('./CustomEditor'),
  { ssr: false }
);

export default ClientEditor;
