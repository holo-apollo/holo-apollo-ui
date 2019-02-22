// @flow

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const getEnv = (key: string) =>
  isServer ? process.env[key] : window.env[key];
