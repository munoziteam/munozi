import { databases } from "./config";
import { ID, Query } from "appwrite";
import COLLECTIONS from "../models/collection";

const db = {};

const dbId = process.env.NEXT_PUBLIC_DATABASE_ID;

const collections = [
  {
    dbId,
    id: process.env.NEXT_PUBLIC_PROFILE_ID,
    name: COLLECTIONS.profile,
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
    listIncrementally: (limit, offset, queries = []) =>
      databases.listDocuments(col.dbId, col.id, [...queries, limit, offset]),
    get: (id) => databases.getDocument(col.dbId, col.id, id),

    // Additional methods
    search: (field, value, limit = 10, offset = 0) =>
      databases.listDocuments(col.dbId, col.id, [
        Query.equal(field, value),
        limit,
        offset,
      ]),
    count: (queries = []) =>
      databases
        .listDocuments(col.dbId, col.id, queries)
        .then((result) => result.total),
    exists: (id) =>
      databases
        .getDocument(col.dbId, col.id, id)
        .then(() => true)
        .catch(() => false),
    batchCreate: (documents, permissions) =>
      Promise.all(
        documents.map((doc) =>
          databases.createDocument(
            col.dbId,
            col.id,
            ID.unique(),
            doc,
            permissions
          )
        )
      ),
    batchDelete: (ids) =>
      Promise.all(
        ids.map((id) => databases.deleteDocument(col.dbId, col.id, id))
      ),
    updatePartial: (id, partialPayload, permissions) =>
      databases.updateDocument(
        col.dbId,
        col.id,
        id,
        { ...partialPayload },
        permissions
      ),
    filter: (conditions, limit = 10, offset = 0) =>
      databases.listDocuments(col.dbId, col.id, [...conditions, limit, offset]),
    getFirst: (queries = []) =>
      databases
        .listDocuments(col.dbId, col.id, queries)
        .then((res) => res.documents[0]),
    getLast: (queries = []) =>
      databases
        .listDocuments(col.dbId, col.id, [
          ...queries,
          Query.orderDesc("created_at"),
        ])
        .then((res) => res.documents[0]),
    watchChanges: (callback) =>
      databases.subscribe(`collections.${col.id}.documents`, (response) => {
        callback(response);
      }),
  };
});

export default db;
