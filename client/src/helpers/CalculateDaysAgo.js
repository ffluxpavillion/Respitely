export default function calculateDaysAgo(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const timeDifference = today.getTime() - date.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference === 0) {
    return '(Today)';
  } else if (daysDifference === 1) {
    return '(1 Day Ago)';
  } else {
    return `${daysDifference} Days Ago`;
  }
}
