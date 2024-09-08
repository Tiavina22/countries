const countries = require('../data/countries.json');

function filterCountries({ country, code, capital, fields, sortBy, sortOrder, page, limit, search }) {
    let result = countries;

    if (search) {
        search = search.toLowerCase();
        result = result.filter(c =>
            c.country.toLowerCase().includes(search) ||
            (c.capital && c.capital.toLowerCase().includes(search))
        );
    }

    if (country) {
        result = result.filter(c => c.country.toLowerCase() === country.toLowerCase());
    }

    if (code) {
        code = code.replace(' ', '+');
        result = result.filter(c => c.code.replace(/\s+/g, '') === code.replace(/\s+/g, ''));
    }

    if (capital) {
        result = result.filter(c => c.capital.toLowerCase() === capital.toLowerCase());
    }

    if (sortBy) {
        sortOrder = sortOrder === 'desc' ? -1 : 1;
        result = result.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
            if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
            return 0;
        });
    }

    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        const start = (page - 1) * limit;
        result = result.slice(start, start + limit);
    }

    if (fields) {
        const fieldArray = fields.split(',');
        result = result.map(c => {
            const filtered = {};
            fieldArray.forEach(field => {
                if (c[field]) filtered[field] = c[field];
            });
            return filtered;
        });
    }

    return result;
}

module.exports = {
    getFilteredCountries: filterCountries
};
