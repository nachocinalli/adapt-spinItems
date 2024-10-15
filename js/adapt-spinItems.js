import components from 'core/js/components';
import SpinItemsView from './SpinItemsView';
import SpinItemsModel from './SpinItemsModel';

export default components.register('spinItems', {
  model: SpinItemsModel,
  view: SpinItemsView
});
