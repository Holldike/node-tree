class NodeRepository {
    load(onloadCallback) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/node/getAll');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            } else {
                onloadCallback(JSON.parse(xhr.responseText))

            }

        };

        xhr.send();

    }

    delete(node) {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/node/delete');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            }

        };

        xhr.send(JSON.stringify(node));

    }

    add(node) {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/node/add');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            }

        };

        xhr.send(JSON.stringify(node));
    }

    update(node) {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/node/update');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            }

        };

        xhr.send(JSON.stringify(node));

    }

    createRoot() {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '/node/createRoot');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log('Something went wrong');

            }

        };

        xhr.send();

    }

}