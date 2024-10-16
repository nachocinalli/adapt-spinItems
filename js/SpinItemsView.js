import ComponentView from 'core/js/views/componentView';

class SpinItemsView extends ComponentView {
  preRender() {
    this.onSpin = this.onSpin.bind(this);
  }

  postRender() {
    this.setReadyStatus();

    this.$('.component__widget').on('onscreen.animate', this.checkIfOnScreen.bind(this));
  }

  checkIfOnScreen({ currentTarget }, options) {
    this.model.set('_isInview', false);
    const { onscreen, percentInviewVertical } = options;
    if (!onscreen || percentInviewVertical < this.model.get('_percentInviewVertical')) return;
    this.model.set('_isInview', true);
    $(currentTarget).off('onscreen.animate');
    const activeItem = this.model.getActiveItem();
    if (!activeItem) {
      const firstItem = this.model.get('_clockwise') ? this.model.getItem(this.model.get('_items').length - 1) : this.model.getItem(0);
      firstItem.set({ _isActive: true, _isVisited: true });
    }
  }

  onSpin(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.spin();
  }
}

SpinItemsView.template = 'spinItems.jsx';

export default SpinItemsView;
