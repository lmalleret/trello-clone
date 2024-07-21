export const mapOrder = <T>(array: T[], order: string[], key: keyof T): T[] => {
  return array.sort(
    (a: T, b: T) => order.indexOf(a[key] as string) - order.indexOf(b[key] as string)
  );
};
