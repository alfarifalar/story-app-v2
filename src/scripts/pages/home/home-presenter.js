import { storyMapper } from "../../data/api-mapper";

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
      
      if (!response.ok) {
        console.error('Stories-response:', response);
        this.#view.populateStoryListError(response.message);
        return;
      }

      const stories = await Promise.all(response.listStory.map(storyMapper));
      console.log('Stories List:', stories);

      this.#view.populateStoryList(response.message, stories);
    } catch (error) {
      console.error('Stories-error:', error);
      this.#view.populateStoryListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
