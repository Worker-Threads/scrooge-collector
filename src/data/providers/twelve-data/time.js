export const getUTCDateRounded = (d = Date.now()) => {
  const date = new Date(d);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return new Date(`${year}-${month}-${day}`).getTime();
};

/**
 * @param {number} from
 * @param {number} to
 */
export const getDatesInRange = (from, to) => {
  const dates = [];
  let currentDate = new Date(from);
  const toDate = new Date(to);

  while (currentDate <= toDate) {
    dates.push(getUTCDateRounded(currentDate.getTime()));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
