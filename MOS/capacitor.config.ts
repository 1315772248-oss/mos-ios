import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mos.assistant',
  appName: 'MOS',
  webDir: 'out',
  ios: {
    contentInset: 'always',
    allowsLinkPreview: false,
  },
};

export default config;