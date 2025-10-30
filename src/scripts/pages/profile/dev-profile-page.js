import DevProfilePresenter from './dev-profile-presenter';

export default class DevProfilePage {
  #presenter = null;

  async render() {
    return `
      <section class="container justify-content-center align-items-center p-3 py-md-4">
        <h1 class="mb-3 mb-lg-4">Developer</h1>
        <div id="dev-profile-container" class="text-center"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new DevProfilePresenter({
      view: this,
    });

    await this.#presenter.loadProfile();
  }

  showProfile(profile) {
    document.getElementById('dev-profile-container').innerHTML = `
      <div class="card p-4 mx-auto">
        <img
          class="avatar img-fluid rounded-circle mx-auto mb-3"
          src="${profile.avatar}"
          alt="Profile Picture"
        />

        <h2>${profile.name}</h2>
        <p class="text-muted mb-2">${profile.title}</p>
        <p class="desc mb-3">${profile.description}</p>

        <div class="socials d-flex justify-content-center gap-3 fs-4">
          <a href="${profile.socials.github}" target="_blank" title="GitHub" class="text-light"> 
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="${profile.socials.linkedin}" target="_blank" title="LinkedIn" class="text-light"> 
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    `;
  }

  showError(message) {
    document.getElementById('dev-profile-container').innerHTML = `
      <div class="alert alert-danger text-center">
        ${message}
      </div>
    `;
  }
}
