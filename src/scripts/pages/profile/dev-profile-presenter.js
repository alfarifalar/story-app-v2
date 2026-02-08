export default class DevProfilePresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async loadProfile() {
    try {
      const profile = {
        name: 'Alfa Rifa Lucky Achmad Rayendra',
        title: 'Frontend Developer | Artificial Intelligence Enthusiast',
        description:
          'Passionate about building elegant web interfaces with modern technology.',
        avatar: 'https://avatars.githubusercontent.com/u/146556514?v=4',
        socials: {
          github: 'https://github.com/alfarifalar',
          linkedin:
            'https://id.linkedin.com/in/alfa-rifa-luky-achmad-rayendra-5a2077289',
        },
      };

      this.#view.showProfile(profile);
    } catch (error) {
      console.error('loadProfile: error:', error);
      this.#view.showError(error.message || 'Gagal memuat profil developer.');
    }
  }
}
