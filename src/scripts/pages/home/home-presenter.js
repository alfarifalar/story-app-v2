export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStoriesListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showStoriesListMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialStoriesAndMap() {
    this.#view.showLoading();

    try {
      await this.showStoriesListMap();
      const response = await this.#model.getAll();
      console.log('initialStories: response:', response);

      const { error, message, listStory } = response.data;

      if (error) {
        console.error('initialStories: server error:', message);
        this.#view.populateStoryListError(message);
        return;
      }

      if (!listStory || listStory.length === 0) {
        this.#view.populateStoryListEmpty();
        return;
      }

      this.#view.populateStoryList(message, listStory);
    } catch (error) {
      console.error('initialStories: error:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat memuat cerita.';
      this.#view.populateStoryListError(message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
