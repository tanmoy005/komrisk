const calculatePercentage = (part: number, total: number): string => {
    if (total === 0) return '0'; // Handle division by zero
    const percent: number = ((part / total) * 100);
    return percent.toFixed(2);
};
export default calculatePercentage;