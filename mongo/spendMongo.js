const mongodb = require("./connectMongo");
const collectionName = "spend";
module.exports = {
  /**
   * 查询
   * @param dbName 数据库名称
   * @param params 查询条件
   */
  query: async function (dbName, params) {
    const db = await mongodb.conn(collectionName);
    const data = await db.collection(dbName).find(params).toArray();
    return data;
  },

  /**
   * 查询一条记录
   * @param dbName 数据库名称
   * @param params 查询条件
   */
  queryOne: async function (dbName, params) {
    const db = await mongodb.conn(collectionName);
    const data = await db.collection(dbName).findOne(params).toArray();
    return data;
  },

  /**
   * 分页查询
   * @param dbName 数据库名称
   * @param params 查询条件
   * @param page  页数
   * @param limit  每页显示多少条
   */
  queryByPage: async function (dbName, params, page, limit) {
    const db = await mongodb.conn(collectionName);
    const data = await db
      .collection(dbName)
      .find(params)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    return data;
  },

  /**
   * 插入一条数据
   * @param dbName 数据库名称
   * @param obj 数据
   */
  insert: async function (dbName, obj) {
    const db = await mongodb.conn(collectionName);
    const data = await db.collection(dbName).insertOne(obj).toArray();
    return data;
  },

  /**
   * 批量插入数据
   * @param dbName 数据库名称
   * @param arr 数组
   */
  insertBatch: async function (dbName, arr) {
    const db = await mongodb.conn(collectionName);
    const data = await db.collection(dbName).insertMany(arr).toArray();
    return data;
  },

  /**
   * 修改一条记录
   * @param dbName 数据库名称
   * @param whereObj 条件
   * @param upObj 更新内容
   */
  update: async function (dbName, whereObj, upObj) {
    const db = await mongodb.conn(collectionName);
    const data = await db.collection(dbName).updateOne(whereObj, upObj);
    return data;
  },

  /**
   * 删除一条记录
   * @param collection 集合名称
   * @param whereObj 条件
   * @param cb 返回值
   */
  delete: async function (dbName, whereObj) {
    const db = await mongodb.conn(collectionName);
    const data = await db.collection(dbName).deleteOne(whereObj);
    return data;
  },
};
