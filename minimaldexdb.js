// TODO: IE11 fallback?

function MinimalDexDB(databaseName, storeName, keyPath) {
	this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	this.database = databaseName;
	this.store = storeName;
	this.keyPath = keyPath;

	this.connect = function(key) {
		var conn = this.indexedDB.open(databaseName, 1);
		conn.mdb = this;

		conn.onupgradeneeded = function() {
			var dbl = conn.result;
			dbl.createObjectStore(this.mdb.store, {keyPath: this.mdb.keyPath});
		};

		return new Promise(function(resolve, reject) { 
			conn.onsuccess = function() {
				this.mdb.db = conn.result;
				resolve(this.mdb.db);
			}
		});
	}

	this.put = function(obj) {
		if (this.db === undefined) throw "[MinmalDexDB] DB not connected.";
		var tx = this.db.transaction(this.store, "readwrite");
		var store = tx.objectStore(this.store);
		store.put(obj);
	}

	this.get = function(key) {
		if (this.db === undefined) throw "[MinmalDexDB] DB not connected.";
		var tx = this.db.transaction(this.store, "readwrite");
		var store = tx.objectStore(this.store);

		return new Promise(function(resolve, reject) {
			var response = store.get(key);
			response.onsuccess = function() {
				resolve(response);
			};
		});
	}

	this.close = function() {
		this.db.close();
	}
}
