// src/repositories/mongo.repository.js

export default class MongoRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll(filter = {}, options = {}) {
        const {
            populate,
            select,
            sort,
            limit,
            skip,
            lean = true,
        } = options;

        let query = this.model.find(filter);

        if (populate) query.populate(populate);

        if (select) query.select(select);

        if (sort) query.sort(sort);

        if (limit) query.limit(limit);

        if (skip) query.skip(skip);

        if (lean) query.lean();

        return await query.exec();
    }

    async findOne(filter = {}, options = {}) {
        const {
            populate,
            select,
            lean = true,
        } = options;

        let query = this.model.findOne(filter);

        if (populate) query.populate(populate);

        if (select) query.select(select);

        if (lean) query.lean();

        return await query.exec();
    }

    async findById(id, options = {}) {
        const {
            populate,
            select,
            lean = true,
        } = options;

        let query = this.model.findById(id);

        if (populate) query.populate(populate);

        if (select) query.select(select);

        if (lean) query.lean();

        return await query.exec();
    }

    async create(data) {
        return await this.model.create(data);
    }

    async updateById(id, data, options = {}) {
        return await this.model.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
                ...options,
            }
        );
    }

    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async deleteMany(filter = {}) {
        return await this.model.deleteMany(filter);
    }

    async insertMany(docs, options = {}) {
        return await this.model.insertMany(docs, options);
    }

    async exists(filter) {
        return await this.model.exists(filter);
    }

    async count(filter = {}) {
        return await this.model.countDocuments(filter);
    }
}