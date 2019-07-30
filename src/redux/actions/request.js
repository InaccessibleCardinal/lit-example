
export default function request({url, method, payload}) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function() {
            if (this.status < 300 && this.readyState === 4) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject({message: this.status});
            }
        }
        xhr.send(payload);
    });
}