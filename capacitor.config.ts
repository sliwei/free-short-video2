import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'ionic.react',
  appName: 'ionic-react',
  webDir: 'dist',
  server: {
    url: 'http://192.168.125.116:8100',
    cleartext: true
  }
}

export default config
