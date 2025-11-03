import { routes } from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { getUserToken, getLogout } from '../utils/auth';
import { 
  authenticatedNavigationListTemplate,
  unauthenticatedNavigationListTemplate,
  subscribeButtonTemplate,
  unsubscribeButtonTemplate
} from '../templates';
import { subscribe, unsubscribe, isCurrentPushSubscriptionAvailable } from '../utils/notification-helper';
import {  isServiceWorkerAvailable, setupSkipToContent, transitionHelper} from '../utils';

class App {
  #content;
  #skipLinkButton;

  constructor({ content, skipLinkButton }) {
    this.#content = content;
    this.#skipLinkButton = skipLinkButton;
  }

  #setupNavigationList() {
    const isLogin = !!getUserToken();
    const navList = document.getElementById('navlist');

    if (!isLogin) {
      navList.innerHTML = unauthenticatedNavigationListTemplate();
      this.#setActiveLink(); // tetap aktifkan state navigasi
      return;
    }

    navList.innerHTML = authenticatedNavigationListTemplate();

    const logoutButton = document.getElementById('logout-button');
    logoutButton?.addEventListener('click', (event) => {
      event.preventDefault();
      if (confirm('Apakah Anda yakin ingin keluar?')) {
        getLogout();
        location.hash = '/login';
      }
    });

    this.#setActiveLink();
  }

  #setActiveLink() {
    const currentHash = location.hash || '#/';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  async #setupPushNotification() {
    const pushNotificationTools = document.getElementById('push-notification-tools');
    const isSubscribed = await isCurrentPushSubscriptionAvailable();
    if (isSubscribed) {
      pushNotificationTools.innerHTML = unsubscribeButtonTemplate();
      document.getElementById('unsubscribe-button').addEventListener('click', () => {
        unsubscribe().finally(() => {
          this.#setupPushNotification();
        });
      });
      return;
    }
    pushNotificationTools.innerHTML = subscribeButtonTemplate();
    document.getElementById('subscribe-button').addEventListener('click', () => {
      subscribe().finally(() => {
        this.#setupPushNotification();
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      },
    });
    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'instant' });
      this.#setupNavigationList();
      window.addEventListener('hashchange', () => this.#setActiveLink());
      if (isServiceWorkerAvailable()) {
        this.#setupPushNotification();
      }
    });

  }
}

export default App;
