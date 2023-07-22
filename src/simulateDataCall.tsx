export const simulateDataCall = (
  delayInMilliseconds: number,
  mockData: any
): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, delayInMilliseconds);
  });
};
