import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeedback } from '../store/slices/feedbackSlice';

export default function useFeedback() {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector((state) => state.feedbacks);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, [dispatch]);

  return {
    feedbacks,
    loading,
    error,
  };
}
