import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('Should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('Should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });
  describe('Get Album', () => {
    it('Should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawkAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawkAB9vmqN3uQ7FjRGTy');
    });

    /* it('Should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    }); */
  });
  describe('Get Albums', () => {
    it('Should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRFRy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRFRy');

      const albums2 = getAlbums(['4aawkAB9vmqN3uQ7FjR23y', '4aawyAB9vmqN3uQ7FjRGTy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawkAB9vmqN3uQ7FjR23y,4aawyAB9vmqN3uQ7FjRGTy');
    });

    /* it('Should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbums('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    }); */
  });
  describe('Get Album Tracks', () => {
    it('Should call fetch method', () => {
      const albumTracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const albumTracks = getAlbumTracks(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRFRy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRFRy/tracks');

      const albumTracks2 = getAlbumTracks(['4aawkAB9vmqN3uQ7FjR23y', '4aawyAB9vmqN3uQ7FjRGTy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawkAB9vmqN3uQ7FjR23y,4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    /* it('Should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    }); */
  });
});
