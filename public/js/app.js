const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
// const message1 = document.getElementById('message-1');
const message1 = document.querySelector('#message-1');
const message2 = document.getElementById('message-2');
// const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    message1.textContent = 'Loading...';
    message2.innerHTML = '';
    fetch('/weather?address=' + location).then((response) => {
    const data = response.json().then((data) => {
        if (data.error) {
            // message1.innerHTML = data.error;
            message1.textContent = data.error;
        } else {
            // message1.innerHTML = data.location;
            message1.textContent = data.location;
            message2.innerHTML = data.forecast;
        }});
    });
});