import {
  loaderAbsoluteTemplate,
  errorTemplate,
  storyDetailTemplate,
  saveStoryButtonTemplate,
  removeStoryButtonTemplate,
} from '../../templates';
import { parseActivePathname } from '../../routes/url-parser';
import Map from '../../utils/map';
import StoriesDetailPresenter from './stories-detail-presenter';
import * as StoriesAPI from '../../data/api';
import Database from '../../data/database';

export default class StoriesDetailPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section class="container justify-content-center align-items-center p-3 py-md-4">
        <div class="d-flex justify-content-between mb-3 mb-lg-4">
          <h1 class="mb-0">Story Detail</h1>
          <div id="save-actions-container" class="my-auto"></div>
        </div>
        <div id="story-detail-container"></div>
        <div id="story-detail-loading"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoriesDetailPresenter(parseActivePathname().id,{
      view: this,
      model: StoriesAPI,
      dbModel: Database,
    });

    this.#presenter.initialStory();
  }

  async populateStory(message, story) {
    document.getElementById('story-detail-container').innerHTML = storyDetailTemplate({
        ...story,
        lat: story.lat || 'lat not available', 
        lon: story.lon || 'lon not available',
      });
      
    await this.#presenter.showStoryMap();
    if (this.#map && story.lat && story.lon) {
      const storyCoordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.name };
      const popupOptions = { content: story.name };
      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }

    // Actions buttons
    this.#presenter.showSaveButton();

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

  renderSaveButton() {
    document.getElementById('save-actions-container').innerHTML =
      saveStoryButtonTemplate();

    document.getElementById('story-detail-save').addEventListener('click', async () => {
      await this.#presenter.saveStory();
      await this.#presenter.showSaveButton();
    });
  }

  saveToBookmarkSuccessfully(message) {
    console.log(message);
  }
  saveToBookmarkFailed(message) {
    alert(message);
  }

  renderRemoveButton() {
    document.getElementById('save-actions-container').innerHTML =
      removeStoryButtonTemplate();

    document.getElementById('story-detail-remove').addEventListener('click', async () => {
      await this.#presenter.removeStory();
      await this.#presenter.showSaveButton();
    });
  }
  removeFromBookmarkSuccessfully(message) {
    console.log(message);
  }
  removeFromBookmarkFailed(message) {
    alert(message);
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
