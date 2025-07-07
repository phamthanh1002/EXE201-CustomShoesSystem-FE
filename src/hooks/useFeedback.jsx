import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFeedback,
  feedbackCustom,
  feedbackAccessory,
  feedbackCleaning,
  resetFeedbackErrors,
} from '../store/slices/feedbackSlice';

export default function useFeedback() {
  const dispatch = useDispatch();

  const {
    feedbacks,
    loading,
    error,

    customFeedbackLoading,
    customFeedbackError,

    accessoryFeedbackLoading,
    accessoryFeedbackError,

    cleaningFeedbackLoading,
    cleaningFeedbackError,
  } = useSelector((state) => state.feedbacks);

  // Fetch all feedbacks when component mounts
  useEffect(() => {
    dispatch(getAllFeedback());

    // Reset errors when unmount
    return () => {
      dispatch(resetFeedbackErrors());
    };
  }, [dispatch]);

  // Submit functions
  const submitCustomFeedback = (formData) => dispatch(feedbackCustom(formData));
  const submitAccessoryFeedback = (formData) => dispatch(feedbackAccessory(formData));
  const submitCleaningFeedback = (formData) => dispatch(feedbackCleaning(formData));

  return {
    // Data
    feedbacks,

    // Loading state
    loading,
    customFeedbackLoading,
    accessoryFeedbackLoading,
    cleaningFeedbackLoading,

    // Error state
    error,
    customFeedbackError,
    accessoryFeedbackError,
    cleaningFeedbackError,

    // Submit functions
    submitCustomFeedback,
    submitAccessoryFeedback,
    submitCleaningFeedback,
  };
}
