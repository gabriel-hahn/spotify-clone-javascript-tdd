import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapperApi from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('SpotifyWrapperApi Library', () => {
  it('Should create an instance of SpotifyWrapperApi', () => {
    const spotify = new SpotifyWrapperApi({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapperApi);
  });

  it('Should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapperApi({
      apiURL: 'blabla',
    });
    expect(spotify.apiURL).to.be.equal('blabla');
  });

  it('Should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapperApi({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('Should receive token as an option', () => {
    const spotify = new SpotifyWrapperApi({
      token: 'foo',
    });
    expect(spotify.token).to.be.equal('foo');
  });

  describe('Request Method', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('Should have request method', () => {
      const spotify = new SpotifyWrapperApi({});
      expect(spotify.request).to.exist;
    });

    it('Should call fetch when request', () => {
      const spotify = new SpotifyWrapperApi({
        token: 'foo',
      });
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Should call fetch with right url passed', () => {
      const spotify = new SpotifyWrapperApi({
        token: 'foo',
      });
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });

    it('Should call fetch with the right headers passed', () => {
      const spotify = new SpotifyWrapperApi({
        token: 'foo',
      });
      const headers = {
        headers: {
          Authorization: `Bearer ${spotify.token}`,
        },
      };
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });
  });
});
