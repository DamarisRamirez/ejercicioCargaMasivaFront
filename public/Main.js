class Main extends ZCustomController {
  onThis_init() {
    window.onpopstate = (e) => {
      if (e.state && e.state.target && e.state.title) {
        this.loadItem(e.state.target, e.state.title, false);
      }
    };
    this.loadItem("./content/Input", "Home");
  }
  onSideBar_openItem(target, title) {
    this.loadItem(target, title);
  }
  onMainContent_selectComponent(target) {
    this.loadItem(target, this.sideBar.getItemTitle(target));
  }

  async loadItem(target, title, pushState = true) {
    this.sideBar.markSelectedItemByTarget(target);
    if (pushState) history.pushState({ target, title }, title);
    await this.mainContent.load(target);
    this.mainTitle.text = "ZVC - " + title;
  }

  onSidePanelToggler_click() {
    this.sideBar.toggleClass("collapsed");
    this.mainContent.toggleClass("collapsed");
  }
}

ZVC.export(Main);
