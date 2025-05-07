// utils/queryParser.ts
export const parseQuery = (query: any) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const filters: any = {};

    if (query.difficulty) {
        filters.difficulty = query.difficulty;
    }

    if (query.paidOnly !== undefined) {
        filters.paidOnly = query.paidOnly === 'true';
    }

    if (query.topicTag) {
        filters['topicTags.slug'] = query.topicTag;
    }

    if (query.status) {
        filters.status = query.status; // e.g., "ac", "notac", null
    }

    if (query.acRateMin || query.acRateMax) {
        filters.acRate = {};
        if (query.acRateMin) filters.acRate.$gte = parseFloat(query.acRateMin);
        if (query.acRateMax) filters.acRate.$lte = parseFloat(query.acRateMax);
    }

    if (query.search) {
        filters.title = { $regex: query.search, $options: 'i' };
    }

    const sortField = query.sortBy || 'questionFrontendId';
    const sortOrder = query.order === 'desc' ? -1 : 1;

    const sort = { [sortField]: sortOrder };

    return { filters, sort, limit, skip, page };
};
