import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFilteredProducts,
  setFilterValue,
  clearFilters as clearFiltersAction,
} from '../store/slices/filterProductSlice';
import debounce from 'lodash/debounce';

export default function useFilterProduct(defaultFilters = {}) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filterProduct.filters);
  const products = useSelector((state) => state.filterProduct.products);
  const loading = useSelector((state) => state.filterProduct.loading);
  const error = useSelector((state) => state.filterProduct.error);

  const prevProductType = useRef(null);

  // Reset filter when ProductType changes
  useEffect(() => {
    const currentProductType = defaultFilters.ProductType;

    if (currentProductType && prevProductType.current !== currentProductType) {
      // Clear old filters except ProductType
      dispatch(clearFiltersAction());

      // Set default filters again (e.g. ProductType)
      for (const key in defaultFilters) {
        dispatch(setFilterValue({ key, value: defaultFilters[key] }));
      }

      prevProductType.current = currentProductType;
    }
  }, [defaultFilters, dispatch]);

  // Debounce fetchFilteredProducts
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      dispatch(fetchFilteredProducts(filters));
    }, 500);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [filters, dispatch]);

  const setFilter = (key, value) => {
    dispatch(setFilterValue({ key, value }));
  };

  const clearFilters = () => {
    dispatch(clearFiltersAction());
    for (const key in defaultFilters) {
      dispatch(setFilterValue({ key, value: defaultFilters[key] }));
    }
  };

  return {
    filters,
    products,
    loading,
    error,
    setFilter,
    clearFilters,
  };
}
