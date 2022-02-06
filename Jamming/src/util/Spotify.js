let accessToken;
const clientID = '33fab2f9787e48aa8d1919cdc476d93f';
const redirectURI = 'http://localhost:3000/';

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
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			const accessUrl =
				'https://accounts.spotify.com/authorize?client_id=' +
				clientID +
				'&response_type=token&scope=playlist-modify-public&redirect_uri=' +
				redirectURI;
			window.location = accessUrl;
		}
	},
	search(searchTerm) {
		const accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (!jsonResponse.tracks) {
					return [];
				}
				return jsonResponse.track.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
				}));
			});
	},
};

export default Spotify;
