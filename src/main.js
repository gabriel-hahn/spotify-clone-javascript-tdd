export const search = (query, type) => {
  fetch(`https://api.spotify.com/v1/search?q=${query}&Type=${type}`);
};
export const searchAlbums = () => {};
export const searchArtists = () => {};
export const searchTracks = () => {};
export const searchPlaylists = () => {};
