import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapperApi from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapperApi({
      token: 'foo',
    });

    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('Should exist the searchAlbums method', () => {
      expect(spotify.search.searchAlbums).to.exist;
    });

    it('Should exist the searchArtists method', () => {
      expect(spotify.search.searchArtists).to.exist;
    });

    it('Should exist the searchTracks method', () => {
      expect(spotify.search.searchTracks).to.exist;
    });

    it('Should exist the searchPlaylists method', () => {
      expect(spotify.search.searchPlaylists).to.exist;
    });
  });
  describe('Search artist', () => {
    it('Should call fetch function', () => {
      const artists = spotify.search.searchArtists('Cream');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const artists = spotify.search.searchArtists('Cream');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Cream&Type=artist');

      const artists2 = spotify.search.searchArtists('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&Type=artist');
    });
  });
  describe('Search albums', () => {
    it('Should call fetch function', () => {
      const albums = spotify.search.searchAlbums('Cream');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const albums = spotify.search.searchAlbums('Cream');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Cream&Type=album');

      const albums2 = spotify.search.searchAlbums('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&Type=album');
    });
  });
  describe('Search tracks', () => {
    it('Should call fetch function', () => {
      const tracks = spotify.search.searchTracks('Layla');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const tracks = spotify.search.searchTracks('Someday');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Someday&Type=track');

      const tracks2 = spotify.search.searchTracks('Patience');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Patience&Type=track');
    });
  });
  describe('Search playlist', () => {
    it('Should call fetch function', () => {
      const playlists = spotify.search.searchPlaylists('Layla');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const playlists = spotify.search.searchPlaylists('Geral');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Geral&Type=playlist');

      const playlists2 = spotify.search.searchPlaylists('Rock');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Rock&Type=playlist');
    });
  });
});
