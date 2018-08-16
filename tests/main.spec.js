import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import {
  search, searchAlbums, searchArtists, searchTracks, searchPlaylists,
} from '../src/main';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Spotify', () => {
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
      const fetchedStub = sinon.stub(global, 'fetch');
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
      fetchedStub.restore();
    });

    it('Should receive the correct url to fetch', () => {
      const fetchedStub = sinon.stub(global, 'fetch');
      const artists = search('Incubus', 'artist');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&Type=artist');

      const albuns = search('Incubus', 'album');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&Type=album');
    });
  });
});
