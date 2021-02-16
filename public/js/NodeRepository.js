class NodeRepository {
    onloadCallback;

    setOnloadCallback(callback) {
        this.onloadCallback = callback;

    }

    load() {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/node/getAll');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            } else {
                this.onloadCallback(JSON.parse(xhr.responseText))

            }

        }.bind(this);

        xhr.send();

    }

    delete(node) {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/node/delete');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            }

        };

        xhr.send(this.param(node));

    }

    add(node) {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/node/add');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            }

        };

        xhr.send(this.param(node));

    }

    createRoot() {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/node/createRoot');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            }

        };

        xhr.send();

    }

    param(object) {
        let encodedString = '';

        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }

                encodedString += encodeURI(prop + '=' + object[prop]);
            }

        }

        return encodedString;

    }

}