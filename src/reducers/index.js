import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomerReducer from './CustomerReducer';
import ProviderReducer from './ProviderReducer';
import ProductReducer from './ProductReducer';
import AddProductReducer from './AddProductReducer';
import CustomerProductReducer from './CustomerProductReducer';
import CartReducer from './CartReducer';
import OrderReducer from './OrderReducer';
import ManageProductReducer from './ManageProductReducer';


export default combineReducers({
  auth: AuthReducer,
  customer: CustomerReducer,
  provider: ProviderReducer,
  product: ProductReducer,
  cProduct: CustomerProductReducer,
  cart: CartReducer,
  order: OrderReducer,
  addProductReducer: AddProductReducer,
  manageProductReducer: ManageProductReducer
});
