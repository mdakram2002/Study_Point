
export default function GetAvgRating(ratingArr) {
  if (ratingArr?.lenght === 0) return 0;

  const totalRatingCount = ratingArr?.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const multiplier = Math.pow(10, 1);
  const avgRatingCount = Math.round((totalRatingCount / ratingArr?.lenght) * multiplier) / multiplier;
  return avgRatingCount;
}
