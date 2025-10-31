export default class StoriesDetailPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStoryMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
      
    } catch (error) {
      console.error('showStoriesListMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialStory(id) {
    this.#view.showLoading();

    try {
      const response = await this.#model.getById(id);
      console.log('StoryDetail Response:', response);

      const { error, message, story } = response.data;

      if (error) {
        console.error('Server error:', message);
        this.#view.populateStoryError(message);
        return;
      }

      this.#view.populateStory(message, story);
    } catch (error) {
      console.error('Request error:', error);

      const message =
        error.response?.data?.message ||
        error.response?.request?.responseText ||
        error.message ||
        'Terjadi kesalahan saat memuat cerita.';

      this.#view.populateStoryError(message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
