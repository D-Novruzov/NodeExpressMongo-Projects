const Product = require("../models/product");

exports.getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true });
  res.status(200).json({
    status: "success",
    nHibits: products.length,
    products,
  });
};
exports.getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regex = /\b(>|>=|<|<=|=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  //fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  //skip and limit
  //skips the documents before the current page
  //returns only limit number of docs
  const page = Number(req.query.page) || 1; //which page to fetch
  const limit = Number(req.query.limit) || 10; //how many results per page
  const skip = (page - 1) * limit; //how many results to skip

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({
    status: "success",
    nHibits: products.length,
    data: {
      products,
    },
  });
};
