migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  collection.viewRule = "@request.auth.id = user_id"
  collection.updateRule = "@request.auth.id = user_id"
  collection.deleteRule = "@request.auth.id = user_id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
