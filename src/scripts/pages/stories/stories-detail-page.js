import {
  loaderAbsoluteTemplate,
  errorTemplate,
  storyDetailTemplate,
} from '../../templates';
import StoriesDetailPresenter from './stories-detail-presenter';
import * as StoriesAPI from '../../data/api';

export default class StoriesDetailPage {
  #presenter = null;

  async render() {
    return `
      <section class="container justify-content-center align-items-center p-3 py-md-4">
        <h1 class="mb-3 mb-lg-4">Detail Story</h1>
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

    // ambil ID dari URL hash: "#/story/123"
    const url = window.location.hash;
    const id = url.split('/')[2]; // ambil bagian setelah "/story/"

    if (!id) {
      this.populateStoryError('ID cerita tidak ditemukan di URL.');
      return;
    }

    await this.#presenter.initialStory(id);
  }

  // tampilkan story detail ke dalam DOM
  populateStory(message, story) {
    document.getElementById('story-detail-container').innerHTML =
      storyDetailTemplate({
        ...story,
        lan: story.lat || '-', // tetap gunakan 'lan' agar sesuai template
        lon: story.lon || '-',
      });
  }

  // tampilkan error (termasuk dari responseText)
  populateStoryError(message) {
    document.getElementById('story-detail-container').innerHTML =
      errorTemplate(message, 'story detail');
  }

  showLoading() {
    document.getElementById('story-detail-loading').innerHTML =
      loaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-detail-loading').innerHTML = '';
  }
}
