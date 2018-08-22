import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach( () => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });

    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach( () => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('Should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('Should have getTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });
  describe('Get Album', () => {
    it('Should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = spotify.album.getAlbum('4aawkAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawkAB9vmqN3uQ7FjRGTy');
    });

    /* it('Should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    }); */
  });
  describe('Get Albums', () => {
    it('Should call fetch method', () => {
      const albums = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRFRy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRFRy');

      const albums2 = spotify.album.getAlbums(['4aawkAB9vmqN3uQ7FjR23y', '4aawyAB9vmqN3uQ7FjRGTy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawkAB9vmqN3uQ7FjR23y,4aawyAB9vmqN3uQ7FjRGTy');
    });

    /* it('Should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbums('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    }); */
  });
  describe('Get Album Tracks', () => {
    it('Should call fetch method', () => {
      const tracks = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const tracks = spotify.album.getTracks(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRFRy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRFRy/tracks');

      const tracks2 = spotify.album.getTracks(['4aawkAB9vmqN3uQ7FjR23y', '4aawyAB9vmqN3uQ7FjRGTy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawkAB9vmqN3uQ7FjR23y,4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    /* it('Should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.gettracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    }); */
  });
});
