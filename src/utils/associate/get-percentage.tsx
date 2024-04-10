const calculatePercentage = (part: number, total: number): number => {
    if (total === 0) return 0; // Handle division by zero
    return ((part / total) * 100).toPrecision(2);
};
export default calculatePercentage;