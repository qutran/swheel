// import App from './Basic';
// import App from './NavLink';
// import App from './Fallback';
import App from './Redirect';
// import App from './AdvancedRedirect';
// import App from './HashRoute';
// import App from './SubRoutes';
// import App from './Protected';
// import App from './BeforeLeave';
// import App from './Lazy';
// import App from './Layout';

const { html } = App.render();

const container = document.createElement('div');
container.innerHTML = html;

document.body.appendChild(container);
