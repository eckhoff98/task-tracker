migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sdjp8w6v",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  // remove
  collection.schema.removeField("sdjp8w6v")

  return dao.saveCollection(collection)
})
