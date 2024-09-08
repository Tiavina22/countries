const { validationResult, body, query } = require('express-validator');
const countryService = require('../services/countryService');

exports.getCountries = [

    query('country').optional().isString().trim().escape(),
    query('code').optional().isString().escape(),
    query('capital').optional().isString().trim().escape(),
    query('fields').optional().isString().trim().escape(),
    query('sortBy').optional().isString().trim().escape(),
    query('sortOrder').optional().isIn(['asc', 'desc']),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('search').optional().isString().trim().escape(),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { country, code, capital, fields, sortBy, sortOrder, page, limit, search } = req.query;

        try {
            const result = countryService.getFilteredCountries({
                country, code, capital, fields, sortBy, sortOrder, page, limit, search
            });
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];
