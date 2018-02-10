Min.dexedDB is a very tiny lightweight wrapper for IndexedDB (well, parts of it). It simply allows you to connect to a database, and to `put()` and `get()`. It uses Promises to make that a bit easier.

It does not, and is not designed to, allow for any complex IndexedDB functionality. I simply wanted to easily add and fetch things, and wanted the code to be absolutely minimal. The minified version is in under 1kb (un-gzipped).

This has not been widely tested, as of yet, but should work with most modern browsers other than IE11 (about 4.5% of my users).

Usage:

```javascript
// You can supply an object with {objectStore: keyPath}...
mdb = new MindexedDB("testDB", {testStore: "name"});
mdb.connect().then(function() {
    mdb.put("testStore", {name: "Ralf", species: "Dog"});
    mdb.put("testStore", {name: "Fred", species: "Cat", numbers: [1,2,3]});
    mdb.get("testStore", "Fred").then(function(animal){console.log(animal.result)});
    mdb.close();
});

// Or an array if you want multiple objectStores:
mdb2 = new MindexedDB("anotherTestDB", [{testStore: "name"}, {extraStore: "name"}]);
mdb2.connect().then(function() {
    mdb2.put("testStore", {name: "Ralf", species: "Dog"});
    mdb2.put("extraStore", {name: "Fred", species: "Cat", numbers: [1,2,3]});
    mdb2.get("extraStore", "Fred").then(function(animal){console.log(animal.result)});
    mdb2.close();
});
```

## Todo

- Allow put() to take an array of objects to add?