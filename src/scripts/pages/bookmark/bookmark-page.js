import {
  loaderAbsoluteTemplate,
  storyItemTemplate,
  emptyTemplate,
  errorTemplate,
} from '../../templates.js';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import Map from '../../utils/map';
import BookmarkPresenter from './bookmark-presenter';
import Database from '../../data/database';

export default class BookmarkPage{
  #presenter = null;
  #map = null;
  async render(){
    return `
      <section class="container justify-content-center align-items-center p-3 py-md-4">
        <h1 class="mb-lg-2">Bookmark Stories</h1>
        <section>
          <div class="mb-2">
            <div id="map" class="map-container"></div>
            <div id="map-loading-container"></div>
          </div>
        </section>
        <hr class="mt-4 mb-2">
        <section class="container px-0">
          <div class="masonry-grid row g-1 g-lg-3 m-0" id="story-list"></div>
          <div id="story-list-loading"></div>
        </section>
      </section>
    `;
  }
  async afterRender() {
    this.#presenter = new BookmarkPresenter({
      view: this,
      model: Database,
    });
    await this.#presenter.initialStoriesAndMap();
  }
  populateStoryList(message, stories) {
    if (stories.length <= 0) {
      this.populateStoryListEmpty();
      return;
    }

    const html = stories.reduce((accumulator, story) => {
      if (this.#map && story.lat != null && story.lon != null) {
        const coordinate = [story.lat, story.lon];
        const markerOptions = { alt: story.name };
        const popupOptions = { content: story.name };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }
      return accumulator.concat(
        storyItemTemplate({
          ...story,
          name: story.name,
        }),
      );
    }, '');

    const storyList = document.getElementById('story-list');
    storyList.innerHTML = `${html}`;

    const grid = storyList.closest('.masonry-grid');
    if (grid) {
      const msnry = new Masonry(grid, {
        itemSelector: '.masonry-item',
        percentPosition: true,
      });

      imagesLoaded(grid, () => msnry.layout());
    }
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 5,
      locate: true,
    });
  }
  
  populateStoryListEmpty() {
    document.getElementById('story-list').innerHTML = emptyTemplate("stories");
  }

  populateStoryListError(message) {
    document.getElementById('story-list').innerHTML = errorTemplate(message, "stories");
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = loaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  showLoading() {
    document.getElementById('story-list-loading').innerHTML = loaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-list-loading').innerHTML = '';
  }

}