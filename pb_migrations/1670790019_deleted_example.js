migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jextxck8akp6uuc");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "jextxck8akp6uuc",
    "created": "2022-12-10 11:06:48.506Z",
    "updated": "2022-12-10 11:06:48.506Z",
    "name": "example",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "czr4js2a",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
