const clientId = '8718a9b8d22c4ae5990b8d471f7a29af'; // Insert client ID here.
const redirectUri = 'http://problematify.netlify.com/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=user-top-read&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async getArtists(time_range) {
    const accessToken = Spotify.getAccessToken();
    return await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(!jsonResponse.items) {
        return [];
      }
      return jsonResponse.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        uri: artist.uri,
        url: artist.images[0].url
      }))
    })
  }
};

export default Spotify;
