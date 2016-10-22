import InitPage from './modules/InitPage';

let initPage = new InitPage(document.body.dataset.pageType);

initPage.execute();
