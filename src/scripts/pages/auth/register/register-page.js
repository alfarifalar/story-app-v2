import RegisterPresenter from './register-presenter';
import * as StoriesAPI from '../../../data/api';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <section class="container justify-content-center align-items-lg-center p-3 p-md-5">
        <article class="card rounded-5 flex-lg-row">
          <div class="card-header d-none d-lg-inline p-5 col-lg-6">
            <img class="img-fluid" src="images/register.png" alt="Register illustration" /> 
          </div>
          <div class="card-body p-5 col-lg-6">
            <img class="img-fluid d-block p-2 mx-auto bg-body-secondary rounded-2" src="images/logo.png" style="height: 50px" alt="logo ARL">
            <h1 class="mt-1 text-center">Register</h1>
            <hr>
            <form id="register-form" class="needs-validation" novalidate>

              <div class="mb-3">
                <label for="name-input" class="form-label">Name</label>
                <input type="text" class="form-control" id="name-input" name="name" required/>
                <div class="invalid-feedback">Please insert name</div>
              </div>

              <div class="mb-3">
                <label for="email-input" class="form-label">Email</label>
                <input type="text" class="form-control" id="email-input" name="email" required/>
                <div class="invalid-feedback">Please insert email</div>
              </div>
      
              <div class="mb-3">
                <label for="password-input" class="form-label">Password</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="password-input" aria-label="User password" name="password" required/>
                  <button class="btn btn-outline-secondary" type="button" id="button-toggle-password">
                    <i class="fa-regular fa-eye"></i>
                  </button>
                </div>
                <div class="invalid-feedback">Please insert password.</div>
              </div>
      
              <div id="submit-button-container" class="d-grid text-end">
                <button class="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
            <div class="mt-4 text-center">
              Sudah punya akun? <a href="#/login">Login</a>
            </div>    
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: StoriesAPI,
    });

    this.#setupForm();
  }

  #setupForm() {
    const toggleButton = document.getElementById('button-toggle-password');
    const passwordInput = document.getElementById('password-input');

    toggleButton.addEventListener('click', () => {
      const icon = toggleButton.querySelector('i');
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      icon.classList.toggle('fa-eye', !isHidden);
      icon.classList.toggle('fa-eye-slash', isHidden);
    });
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        password: document.getElementById('password-input').value,
      };
      await this.#presenter.register(data);
    });
  }

  registeredSuccessfully(message) {
    console.log(message);

    // Redirect
    location.hash = '/login';
  }

  registeredFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit" disabled>
        <i class="fas fa-spinner fa-spin"></i> Loading...
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn btn-primary" type="submit">Submit</button>
    `;
  }
}
