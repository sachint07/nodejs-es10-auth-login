'use strict'

import { mongoClientDB } from '../../Server'

// Find ONE
const mongoFindOne = async (model, query = {}, options) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.findOne(query, options)
}
// Find Many
const mongoFind = async (model, query = {}, options) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.find(query, options)
}
// Insert ONE
const mongoInsertOne = async (model, doc) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.insertOne(doc)
}
// Insert Many
const mongoInsertMany = async (model, docs) => {
  const thisCollection = mongoClientDB.collection(model)
  // this option prevents additional documents from being inserted if one fails
  const options = { ordered: true }
  return await thisCollection.insertMany(docs, options)
}
// Update ONE
const mongoUpdateOne = async (model, filter, updateDoc) => {
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: true }
  return await thisCollection.updateOne(filter, updateDoc, options)
}
// Update Many
const mongoUpdateMany = async (model, filter, updateDocs) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.updateMany(filter, updateDocs)
}

// Count Total Documents
const mongoCountDocuments = async (model, query = {}) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.countDocuments(query)
}

export const MONGO_MODEL = {
  mongoFindOne,
  mongoFind,
  mongoInsertOne,
  mongoInsertMany,
  mongoUpdateOne,
  mongoUpdateMany,
  mongoCountDocuments
}
