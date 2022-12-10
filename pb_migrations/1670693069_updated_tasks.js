migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gp6f28sy",
    "name": "location",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pclswmdv5pq75rr")

  // remove
  collection.schema.removeField("gp6f28sy")

  return dao.saveCollection(collection)
})
