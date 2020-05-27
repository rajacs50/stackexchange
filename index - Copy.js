const userStore = window.localStorage;

document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When user clicks continue, check the user in local store and if exists send it back to server
    // get the value from the username box and store it in a var so we can check it or send it back
    // after checking the name if it is available, greet the user
    // if not ask the user if they want to create a user as they dont exist
    if (!userStore.getItem('username')){
        document.addEventListener('load', () => {
            document.querySelector('#form').onsubmit = function() {
                console.log("submitted");
                const name = document.querySelector('#username').value;
                EventObject.preventDefault();
                console.log(name);
                alert(`Welcome back ${name}!`);
            };
        });
    } else {
        console.log("submitted after else");
        userStore.setItem('username', document.querySelector("#username"));
        const uname = document.querySelector('#username').value;
        console.log(uname)
    }

    // userStore.setItem('<TO DO: Set current user, with an unique ID and Display Name>')
    // userStore.getItem('<TO DO: Get the current user details>')  


    socket.on('connect', () => {

        // send_message button will emit an associated event
        console.log(userStore.getItem('username').value);
        console.log("connected");
        var archive = [],
        keys = Object.keys(userStore),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + userStore.getItem(key));
        socket.emit('connected', {info: archive});
    }
     
    });

//     // When a new vote is announced, add to the unordered list
//     socket.on('vote totals', data => {
//         document.querySelector('#yes').innerHTML = data.yes;
//         document.querySelector('#no').innerHTML = data.no;
//         document.querySelector('#maybe').innerHTML = data.maybe;
//     });
});
