import swagger from '@elysiajs/swagger';

export const swag = swagger({
  path: 'api/swagger',
  autoDarkMode: true,
  documentation: {
    info: {
      title: '🦊 parent care api doc',
      description: 'this is swagger document api',
      version: '1.0.0-alpha',
    },
  },
});
