class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //mongoose query, like: Mongoose.find
    this.queryString = queryString || {}; //req.query
  }
  filter() {
    const queryObj = { ...this.queryString };

    console
      .log(queryObj)
    const excludedFields = ["page", "limit", "sort", "fields"]
    for(const field of excludedFields) {
        delete queryObj[field]
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne|in)\b/g,
      (match) => `$${match}`
    );
    let parsed = JSON.parse(queryStr);

    for (let key in parsed) {
      if (
        parsed[key] &&
        parsed[key].$in &&
        typeof parsed[key].$in === "string"
      ) {
        parsed[key].$in = parsed[key].$in.split(",");
      }
    }
    this.query = this.query.find(parsed);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }

    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }
  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
