export default {
  async scheduled() {
    const url = 'https://api.marcoczirpek.com/wakeup';

    try {
      await fetch(url, { method: 'POST' });
    } catch (_) {}
  }
};
