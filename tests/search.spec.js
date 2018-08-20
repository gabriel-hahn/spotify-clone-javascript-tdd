import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
  search, searchAlbums, searchArtists, searchTracks, searchPlaylists,
} from '../src/search';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Search', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('Should exist the search method', () => {
      expect(search).to.exist;
    });

    it('Should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('Should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('Should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('Should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });
  describe('Generic search', () => {
    it('Should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      context('One type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&Type=artist');

        const albuns = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&Type=album');
      });

      context('More than one type', () => {
        const artistsAndAlbuns = search('Metallica', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Metallica&Type=artist,album');
      });
    });

    /* Add this test after the authentication with API.
      it('Should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      //eql -> Deep equal
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    }); */
  });
  describe('Search artist', () => {
    it('Should call fetch function', () => {
      const artists = searchArtists('Cream');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const artists = searchArtists('Cream');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Cream&Type=artist');

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&Type=artist');
    });
  });
  describe('Search albums', () => {
    it('Should call fetch function', () => {
      const albums = searchAlbums('Cream');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const albums = searchAlbums('Cream');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Cream&Type=album');

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&Type=album');
    });
  });
  describe('Search tracks', () => {
    it('Should call fetch function', () => {
      const tracks = searchTracks('Layla');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const tracks = searchTracks('Someday');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Someday&Type=track');

      const tracks2 = searchTracks('Patience');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Patience&Type=track');
    });
  });
  describe('Search playlist', () => {
    it('Should call fetch function', () => {
      const playlists = searchPlaylists('Layla');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Geral');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Geral&Type=playlist');

      const playlists2 = searchPlaylists('Rock');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Rock&Type=playlist');
    });
  });
});
