import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class SpinModel extends ItemsComponentModel {
  spin() {
    const activeItem = this.getActiveItem();

    activeItem.set('_isActive', false);
    const nextItem = this.getItem(activeItem.get('_index') + 1);
    if (nextItem) {
      nextItem.set({ _isActive: true, _isVisited: true });
    } else {
      this.getItem(0).set('_isActive', true);
    }
  }
}
