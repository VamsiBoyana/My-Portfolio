import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

// Create and export the base44 client instance
export const base44 = createClient({
  appId: appParams.appId,
  token: appParams.token,
  appBaseUrl: appParams.appBaseUrl,
  functionsVersion: appParams.functionsVersion,
});

