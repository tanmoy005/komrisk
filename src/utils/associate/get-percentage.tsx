const calculatePercentage = (part: number, total: number): string => {
    if (total === 0) return '0'; // Handle division by zero
    const percnt: number = ((part / total) * 100);
    return percnt.toFixed(2);
};
export default calculatePercentage;