const SELECTED_REVIEWS_KEY = 'flex-living-selected-reviews';

export const getSelectedReviewIds = (): number[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(SELECTED_REVIEWS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const setSelectedReviewIds = (ids: number[]) => {
  localStorage.setItem(SELECTED_REVIEWS_KEY, JSON.stringify(ids));
};

export const toggleReviewSelection = (reviewId: number): number[] => {
  const current = getSelectedReviewIds();
  const updated = current.includes(reviewId)
    ? current.filter(id => id !== reviewId)
    : [...current, reviewId];
  setSelectedReviewIds(updated);
  return updated;
};