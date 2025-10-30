import {
  loaderAbsoluteTemplate,
  storyItemTemplate,
  emptyTemplate,
  errorTemplate,
} from '../../templates';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded'; // direkomendasikan
import HomePresenter from './home-presenter';
import * as StoriesAPI from '../../data/api';

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section class="container justify-content-center align-items-center p-3 py-md-4">
        <h1 class="mb-lg-2">Home</h1>
        <div class="container px-0">
          <div class="masonry-grid row g-1 g-lg-3 m-0" id="story-list"></div>
          <div id="story-list-loading"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoriesAPI,
    });

    await this.#presenter.initialStories();
  }

  populateStoryList(message, stories) {
    if (stories.length <= 0) {
      this.populateStoryListEmpty();
      return;
    }

    const html = stories.reduce((accumulator, story) => {
      return accumulator.concat(
        storyItemTemplate({
          ...story,
          name: story.name,
        }),
      );
    }, '');

    const storyList = document.getElementById('story-list');
    storyList.innerHTML = `${html}`;

    // 🔥 Inisialisasi Masonry
    const grid = storyList.closest('.masonry-grid');
    if (grid) {
      const msnry = new Masonry(grid, {
        itemSelector: '.masonry-item',
        percentPosition: true,
      });

      // 🖼️ Pastikan gambar sudah termuat sebelum layout
      imagesLoaded(grid, () => msnry.layout());
    }
  } // ← ini kurung penutup yang tadinya hilang

  populateStoryListEmpty() {
    document.getElementById('story-list').innerHTML = emptyTemplate("stories");
  }

  populateStoryListError(message) {
    document.getElementById('story-list').innerHTML = errorTemplate(message, "stories");
  }

  showLoading() {
    document.getElementById('story-list-loading').innerHTML = loaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-list-loading').innerHTML = '';
  }
}
