export const combine = <T>(list: T[]): T[][] => {
  if (list.length === 0) return [];
  if (list.length <= 2) return [list];

  const [first, second, ...tail] = list;

  return [
    [first, second],
    ...combine([first, ...tail]),
    ...combine([second, ...tail]),
  ];
};
