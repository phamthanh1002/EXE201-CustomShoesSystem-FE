//APIs Auth
export const API_LOGIN = '/auth/login';
export const API_REGISTER = '/auth/register';

//APIs Customer Address
export const API_CREATE_ADDRESS = '/CustomerAddresses';
export const API_GET_MY_ADDRESS = '/CustomerAddresses/my-addresses';
export const API_SET_DEFAULT_ADDRESS = '/CustomerAddresses/set-default/:id';
export const API_DELETE_ADDRESS = '/CustomerAddresses/hard-delete/:id';
export const API_UPDATE_ADDRESS = '/CustomerAddresses/:id';

//APIs Product
export const API_GET_TOP_8_CUSTOM_PRODUCT = '/Product/custom/hot-products?topN=8';
export const API_GET_TOP_8_ACCESSORY = '/Product/accessory/hot-products?topN=8';
export const API_GET_ALL_PRODUCT = '/Product/custom';
export const API_GET_ALL_ACCESSORY = '/Product/accessory';

//APIs Filter Product
export const API_SEARCH_PRODUCT = '/Product/search?';

//APIs Feedback Product
export const API_GET_ALL_FEEDBACK = '/Feedback/all';

//APIs Service
export const API_GET_ALL_SERVICE = '/ServicePackage';

//APIs Orders
export const API_CREATE_ORDER = '/Order/create-order';
export const API_GET_ALL_MY_ORDER = '/Order/user/:id';
