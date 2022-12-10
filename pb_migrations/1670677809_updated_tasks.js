migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  // remove
  collection.schema.removeField("oxlcarth")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oxlcarth",
    "name": "dateTime",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
