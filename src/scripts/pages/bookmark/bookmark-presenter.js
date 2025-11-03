import { storyMapper } from '../../data/api-mapper';
 
export default class BookmarkPresenter {
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
      const listStory = await this.#model.getAllStory();

      const stories = await Promise.all(listStory.map(storyMapper));
      const message = 'Success get bookmarks';
      this.#view.populateStoryList(message, stories);
    } catch (error) {
      console.error('Stories-error:', error);
      this.#view.populateStoryListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
    
}