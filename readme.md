MinimalDexDB is a very tiny lightweight wrapped for IndexedDB (well, parts of it). It simply allows you to connect to a database, and to put() and get(). It uses Promises to make that a bit easier.

It does not, and is not designed to, allow for any complex IndexedDB functionality. I simply wanted to easily add and fetch things, and wanted the code to be absolutely minimal. The minified version is in under 1kb (un-gzipped).

This has not been widely tested, as of yet. It should work with most modern browsers, other than IE11 (about 4.5% of my users).

Usage:

```javascript
mdb = new MinimalDexDB("testDB", "testStore", "name");
mdb.connect().then(function() {
    mdb.put({name: "Ralf", species: "Dog"});
    mdb.put({name: "Fred", species: "Cat", numbers: [1,2,3]});
    mdb.get("Fred").then(function(animal){console.log(animal.result)});
    mdb.close();
});
```