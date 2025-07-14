//APIs Auth
export const API_LOGIN = '/auth/login';
export const API_REGISTER = '/auth/register';
export const API_EDIT_PROFILE = '/admin/users/email/profile';

//APIs Customer Address
export const API_CREATE_ADDRESS = '/CustomerAddresses';
export const API_GET_MY_ADDRESS = '/CustomerAddresses/my-addresses';
export const API_SET_DEFAULT_ADDRESS = '/CustomerAddresses/set-default/:id';
export const API_DELETE_ADDRESS = '/CustomerAddresses/hard-delete/:id';
export const API_UPDATE_ADDRESS = '/CustomerAddresses/:id';

//APIs Product
export const API_GET_TOP_8_CUSTOM_PRODUCT = '/Product/custom/hot-products?topN=8';
export const API_GET_TOP_8_ACCESSORY = '/Product/accessory/hot-products?topN=8';
export const API_GET_ALL_CUSTOM = '/Product/custom';
export const API_GET_ALL_ACCESSORY = '/Product/accessory';
export const API_GET_ALL_PRODUCT = '/Product';
export const API_CREATE_CUSTOM_PRODUCT = '/Product/custom';
export const API_CREATE_ACCESSORY_PRODUCT = '/Product/accessory';
export const API_DELETE_PRODUCT = '/Product/:id/hard';
export const API_UPDATE_PRODUCT = '/Product/:id';
export const API_CHANGE_ACTIVE_PRODUCT = '/Product/:id/toggle-isactive';

//APIs Filter Product
export const API_SEARCH_PRODUCT = '/Product/search?';

//APIs Feedback Product
export const API_GET_ALL_FEEDBACK = '/Feedback/all';
export const API_CREATE_FEEDBACK_CUSTOM = '/Feedback/custom';
export const API_CREATE_FEEDBACK_ACCESSORY = '/Feedback/accessory';
export const API_CREATE_FEEDBACK_CLEANING = '/Feedback/cleaning';
export const API_DELETE_FEEDBACK = '/Feedback/:id/hard';
export const API_CHANGE_ACTIVE_FEEDBACK = '/Feedback/:id/toggle-isactive';

//APIs Service
export const API_GET_ALL_SERVICE = '/ServicePackage';

//APIs Orders
export const API_GET_ALL_ORDER = '/Order';
export const API_CREATE_ORDER = '/Order/create-order';
export const API_GET_ALL_MY_ORDER = '/Order/user/:id';
export const API_GET_ORDER_DETAIL = '/OrderDetail/order/:orderID';
export const API_ORDER_START_PROCESSING = '/Order/:id/start-processing';
export const API_ORDER_PENDING_SHIP = '/Order/:id/pending-ship';

//APIs Pickups
export const API_GET_ALL_PICKUP = '/PickupRequest';
export const API_UPDATE_SHIPPER = '/PickupRequest/:id';
export const API_UPDATE_PICKING_UP = '/PickupRequest/update-to-picking/:id';
export const API_UPDATE_PICKING_UP_DONE = '/PickupRequest/update-to-picked/:id';

// APIs Delivery
export const API_GET_DELIVERY_BY_ORDERID = '/Delivery/byorder/:id';
export const API_CREATE_DELIVERY = '/Delivery';
export const API_START_DELIVERY = '/Delivery/:id/start';
export const API_COMPLETE_DELIVERY = '/Delivery/:id/complete';

// APIs Admin
export const API_GET_ALL_USER = '/admin/users';
export const API_GET_REVENUE = '/Revenue/monthly';
export const API_GET_MONTHLY_REVENUE = '/Revenue/monthly';
