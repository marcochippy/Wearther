export default {
  async fetch() {
    return new Response('This Worker runs on a cron schedule.', { status: 200 });
  },

  async scheduled() {
    const url = 'https://api.marcoczirpek.com/wakeup';

    try {
      await fetch(url, { method: 'POST' });
    } catch (_) {}
  }
};
