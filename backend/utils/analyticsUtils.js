/**
 * ==========================================
 * Analytics Utility Functions
 * ==========================================
 * Shared helper functions for the Analytics
 * module.
 * ==========================================
 */

/**
 * Parse and validate date range from query params.
 */
export const getDateRange = (query) => {
    const { startDate, endDate } = query;

    const end = endDate ? new Date(endDate) : new Date();

    const start = startDate
        ? new Date(startDate)
        : new Date(end.getFullYear(), end.getMonth(), 1);

    // Normalize time boundaries
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

/**
 * Safely calculate percentage.
 */
export const calculatePercentage = (value, total) => {
    if (!total || total === 0) return 0;

    return Number(((value / total) * 100).toFixed(2));
};

/**
 * Growth percentage.
 */
export const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return 0;

    return Number((((current - previous) / previous) * 100).toFixed(2));
};

/**
 * Round currency values.
 */
export const roundAmount = (amount) => {
    return Number(Number(amount).toFixed(2));
};

/**
 * Group Date
 *
 * Output:
 * 2026-07
 */
export const getMonthKey = (date) => {
    const d = new Date(date);

    return `${d.getFullYear()}-${String(
        d.getMonth() + 1
    ).padStart(2, "0")}`;
};

/**
 * Group by Day
 *
 * Output:
 * 2026-07-15
 */
export const getDayKey = (date) => {
    const d = new Date(date);

    return d.toISOString().split("T")[0];
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
    return roundAmount(amount);
};

/**
 * Sum array values.
 */
export const sumValues = (items, key) => {
    return items.reduce((total, item) => total + Number(item[key] || 0), 0);
};

/**
 * Average value.
 */
export const average = (items, key) => {
    if (!items.length) return 0;

    return roundAmount(sumValues(items, key) / items.length);
};

/**
 * Find largest item.
 */
export const getLargest = (items, key) => {
    if (!items.length) return null;

    return items.reduce((largest, current) =>
        Number(current[key]) > Number(largest[key])
            ? current
            : largest
    );
};

/**
 * Find smallest item.
 */
export const getSmallest = (items, key) => {
    if (!items.length) return null;

    return items.reduce((smallest, current) =>
        Number(current[key]) < Number(smallest[key])
            ? current
            : smallest
    );
};

/**
 * Monthly Aggregator
 */
export const groupByMonth = (items, amountField = "amount") => {
    const grouped = {};

    items.forEach((item) => {
        const key = getMonthKey(item.date);

        grouped[key] = (grouped[key] || 0) + Number(item[amountField]);
    });

    return grouped;
};

/**
 * Daily Aggregator
 */
export const groupByDay = (items, amountField = "amount") => {
    const grouped = {};

    items.forEach((item) => {
        const key = getDayKey(item.date);

        grouped[key] = (grouped[key] || 0) + Number(item[amountField]);
    });

    return grouped;
};