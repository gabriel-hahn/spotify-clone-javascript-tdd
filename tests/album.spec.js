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
      spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      spotify.album.getAlbum('4aawkAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawkAB9vmqN3uQ7FjRGTy');
    });
  });
  describe('Get Albums', () => {
    it('Should call fetch method', () => {
      spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRFRy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRFRy');

      spotify.album.getAlbums(['4aawkAB9vmqN3uQ7FjR23y', '4aawyAB9vmqN3uQ7FjRGTy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawkAB9vmqN3uQ7FjR23y,4aawyAB9vmqN3uQ7FjRGTy');
    });
  });
  describe('Get Album Tracks', () => {
    it('Should call fetch method', () => {
      spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      spotify.album.getTracks(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRFRy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRFRy/tracks');

      spotify.album.getTracks(['4aawkAB9vmqN3uQ7FjR23y', '4aawyAB9vmqN3uQ7FjRGTy']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawkAB9vmqN3uQ7FjR23y,4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });
  });
});
