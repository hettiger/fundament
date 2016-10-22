export default class InitPage {

  constructor(pageType) {
    this.pageType = pageType;
  }

  execute() {
    let fn = this[this.pageType];

    if (typeof fn === 'function') {
      fn();
    }
  }

  // noinspection JSUnusedGlobalSymbols
  example() {
    console.log('Init page type "example"');
  }

}
