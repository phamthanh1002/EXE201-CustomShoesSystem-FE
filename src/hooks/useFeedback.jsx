import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFeedback as getAllFeedbackThunk,
  feedbackCustom,
  feedbackAccessory,
  feedbackCleaning,
  resetFeedbackErrors,
  deleteFeedback as deleteFeedbackThunk,
  changeActiveFeedback as changeActiveFeedbackThunk,
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

    deleteFeedbackLoading,
    deleteFeedbackError,
  } = useSelector((state) => state.feedbacks);

  // Fetch all feedbacks when component mounts
  useEffect(() => {
    dispatch(getAllFeedbackThunk());

    // Reset errors when unmount
    return () => {
      dispatch(resetFeedbackErrors());
    };
  }, [dispatch]);

  // Submit functions
  const getAllFeedbacks = () => dispatch(getAllFeedbackThunk());
  const submitCustomFeedback = (formData) => dispatch(feedbackCustom(formData));
  const submitAccessoryFeedback = (formData) => dispatch(feedbackAccessory(formData));
  const submitCleaningFeedback = (formData) => dispatch(feedbackCleaning(formData));
  const deleteFeedback = (feedbackID) => dispatch(deleteFeedbackThunk(feedbackID)).unwrap();
  const changeActiveFeedback = (feedbackID) => {
    return dispatch(changeActiveFeedbackThunk(feedbackID)).unwrap();
  };

  return {
    // Data
    feedbacks,

    // Loading state
    loading,
    customFeedbackLoading,
    accessoryFeedbackLoading,
    cleaningFeedbackLoading,
    deleteFeedbackLoading,

    // Error state
    error,
    customFeedbackError,
    accessoryFeedbackError,
    cleaningFeedbackError,
    deleteFeedbackError,

    // Submit functions
    submitCustomFeedback,
    submitAccessoryFeedback,
    submitCleaningFeedback,
    deleteFeedback,
    changeActiveFeedback,
    getAllFeedbacks,
  };
}
