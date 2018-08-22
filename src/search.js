function searcher(type, query) {
  return this.request(`${this.apiURL}/${type}/${query}`);
}

export default function search() {
  return {
    searchArtists: searcher.bind(this, 'artist'),
    searchAlbums: searcher.bind(this, 'album'),
    searchTracks: searcher.bind(this, 'track'),
    searchPlaylists: searcher.bind(this, 'playlists'),
  };
}
