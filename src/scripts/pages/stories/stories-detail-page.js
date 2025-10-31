import {
  loaderAbsoluteTemplate,
  errorTemplate,
  storyDetailTemplate,
} from '../../templates';
import Map from '../../utils/map';
import StoriesDetailPresenter from './stories-detail-presenter';
import * as StoriesAPI from '../../data/api';

export default class StoriesDetailPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section class="container justify-content-center align-items-center p-3 py-md-4">
        <h1 class="mb-3 mb-lg-4">Story Detail</h1>
        <div id="story-detail-container"></div>
        <div id="story-detail-loading"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoriesDetailPresenter({
      view: this,
      model: StoriesAPI,
    });

    const url = window.location.hash;
    const id = url.split('/')[2]; 

    if (!id) {
      this.populateStoryError('ID cerita tidak ditemukan di URL.');
      return;
    }

    await this.#presenter.initialStory(id);
    
  }

  async populateStory(message, story) {
    document.getElementById('story-detail-container').innerHTML = storyDetailTemplate({
        ...story,
        lat: story.lat || '-', 
        lon: story.lon || '-',
      });
      
    await this.#presenter.showStoryMap();
    if (this.#map) {
      const storyCoordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.name };
      const popupOptions = { content: story.name };
      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }

  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 10,
      locate: true,
    });
  }

  populateStoryError(message) {
    document.getElementById('story-detail-container').innerHTML =
      errorTemplate(message, 'story detail');
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = loaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  showLoading() {
    document.getElementById('story-detail-loading').innerHTML =
      loaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-detail-loading').innerHTML = '';
  }
}
