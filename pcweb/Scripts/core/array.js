/*=======================array.js===========================*/
Ymt.add('Array', function (w) {
    function u() {
        if (!(this instanceof u)) return new u();
    }
    var array = {
        each: function (arr, fn) {
            var len = arr.length, i, args = Array.prototype.slice.call(arguments, 2);
            for (i = 0; i < len; i++) {
                if (!fn.apply(this, [arr[i], i, arr].concat(args))) {
                    break
                }
            }
            return this;
        },
        filter: function (arr, fn) {
            var len = arr.length, i, slice = [], args = Array.prototype.slice.call(arguments, 2);
            for (i = 0; i < len; i++) {
                if (!fn.apply(this, [arr[i], i, arr].concat(args))) {
                    slice.push(arr[i]);
                }
            }
            return slice;
        },
        contains: function (arr, item) {
            return this.indexOf(arr, item) > -1;
        },
        indexOf: function (arr, item) {
            var len = arr.length, i;
            for (i = 0; i < len; i++) {
                if (arr[i] == item) {
                    return i
                }
            }
            return -1;
        },
        lastIndexOf: function (arr, item) {
            arr = arr.reverse();
            return this.indexOf(arr, item);
        },
        unique: function (arr) {
            var slice = [], len = arr.length, i;
            for (i = 0; i < len; i++) {
                !this.contains(slice, arr[i]) && slice.push(arr[i]);
            }
            return slice;
        },
        complement: function (arr1, arr2) {
            return this.minus(this.union(arr1, arr2), this.intersect(arr1, arr2));
        },
        intersect: function (arr1, arr2) {
            arr1 = this.unique(arr1), arr2 = this.unique(arr2);
            return this.filter(arr1, function (m, n, c, d) {
                return !this.contains(d, m);
            }, arr2)
        },
        minus: function (arr1, arr2) {
            arr1 = this.unique(arr1), arr2 = this.unique(arr2);
            return this.filter(arr1, function (m, n, c, d) {
                return this.contains(d, m);
            }, arr2)
        },
        union: function (arr1, arr2) {
            return this.unique(arr1.concat(arr2));
        }
    }
    i.augment(u, array);
    i.array = u();
    return u;
})
