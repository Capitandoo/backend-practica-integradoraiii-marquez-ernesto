import MongoDao from "../mongo.dao.js";
import { ProductsModel } from "../models/ProductModel.js";

export default class ProductManager extends MongoDao {

  constructor() {
    super (ProductsModel)
  }

  /*async getProducts(page = 1, limit = 5, key, value, sortField, sortOrder) {
    try {
      const query = {};
      if (key && value ) {
          query[key] = value;
      };
      const options = {page, limit, sort: {}}
      if (sortField && sortOrder) {
          options.sort[sortField] = sortOrder;
      };
      const response = await ProductsModel.paginate({}, query, options);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
*/

}
