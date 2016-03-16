$m.create('data', {
    expando: "DATAEXPANDO" + parseInt(Math.random() * 10e5),
    cache: {},
    uuid: 1,
    get: function (obj, key) {
        if (!obj) {
            return null;
        }
        var id = obj[this.expando];
        if (!id) {
            return null;
        }
        if (!key) {
            return this.cache[id]
        }
        return this.cache[id][key];
    },
    set: function (obj, key, value) {
        if (obj != null && typeof key == "string" && value) {
            var id = obj[this.expando];
            obj[this.expando] = id = id ? id : this.uuid++;
            this.cache[id] = this.cache[id] || {};
            this.cache[id][key] = value;
            return value;
        }
    },
    del: function (obj, key) {
        if (!obj) {
            this.cache = null;
        }
        var id = obj[this.expando];
        if (!id) {
            return;
        }
        if (!key) {
            obj[this.expando] = null;
            delete this.cache[id]
        }
        delete this.cache[id][key];
    }
}, null);