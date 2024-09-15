export const getAvgWordWidth = (widths: number[]): number => {
    if (widths.length === 0) return 0;
    const totalWidth = widths.reduce((sum, width) => sum + width, 0);
    return totalWidth / widths.length;
  };