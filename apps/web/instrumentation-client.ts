import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    {
      path: '/api/diagnose',
      method: 'POST',
    },
  ],
});
