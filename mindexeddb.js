// TODO: IE11 fallback?

function MindexedDB(databaseName, objectStores) {
	this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	this.database = databaseName;
	this.objectStores = Array.isArray(objectStores) ? objectStores : [objectStores];

	this.connect = function(key) {
		var conn = this.indexedDB.open(databaseName, 1);
		conn.mdb = this;

		conn.onupgradeneeded = function() {
			var dbl = conn.result;
			this.mdb.objectStores.forEach(element => {
				var store = Object.entries(element);
				dbl.createObjectStore(store[0][0], {keyPath: store[0][1]});
			});
		};

		return new Promise(function(resolve, reject) { 
			conn.onsuccess = function() {
				this.mdb.db = conn.result;
				resolve(this.mdb.db);
			}
			conn.onerror = function() {
				resolve(false);
			}
		});
	}

	this.put = function(store, obj) {
		if (this.db === undefined) throw "[MindexDB] DB not connected.";
		var tx = this.db.transaction(store, "readwrite");
		var os = tx.objectStore(store);

		return new Promise(function(resolve, reject) {
			var response = os.put(obj);
			response.onsuccess = function() {
				resolve(true);
			};
			response.onerror = function() {
				resolve(false);
			};
		});
	}

	this.get = function(store, key) {
		if (this.db === undefined) throw "[MindexDB] DB not connected.";
		var tx = this.db.transaction(store, "readwrite");
		var os = tx.objectStore(store);

		return new Promise(function(resolve, reject) {
			var response = os.get(key);
			response.onsuccess = function() {
				resolve(response);
			};
			response.onerror = function() {
				resolve(false);
			};
		});
	}

	this.close = function() {
		this.db.close();
	}
}
