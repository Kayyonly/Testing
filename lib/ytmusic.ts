import YTMusic from 'ytmusic-api';

let client: YTMusic | null = null;

export async function getYTMusicClient() {
  if (!client) {
    client = new YTMusic();
    await client.initialize();
  }

  return client;
}
