import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class SpinModel extends ItemsComponentModel {
  spin() {
    const _clockwise = this.get('_clockwise');
    const activeItem = this.getActiveItem();

    const nextItem = _clockwise ? this.getPrevItem() : this.getNextItem();

    activeItem.set('_isActive', false);
    if (nextItem) {
      nextItem.set({ _isActive: true, _isVisited: true });
    } else {
      this.getItem(0).set('_isActive', true);
    }
  }

  getNextItem() {
    const activeItem = this.getActiveItem();
    return this.getItem(activeItem.get('_index') + 1);
  }

  getPrevItem() {
    const activeItem = this.getActiveItem();
    if (activeItem.get('_index') === 0) {
      return this.getItem(this.get('_items').length - 1);
    }
    return this.getItem(activeItem.get('_index') - 1);
  }
}
