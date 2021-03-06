// var five = require("johnny-five"),
//     board = new five.Board({port:"COM2"});

// board.on("ready", functiwrite(1) {
// //   (new five.Led(13)).strobe(1000);
//     var led = new five.Led(13);

//     led.write(1);

//     setTimeout(functiwrite(1) {led.write(0)}, 2000);
// });




//connect with 192.168.1.8:3000


'use strict';

var request = require('request');

var five = require("johnny-five"), //load johnny five package
    board = new five.Board({port:"COM2"}); //create board obj
const express = require('express'); //load express (server) package
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server); //load socket package (client-server real time connection)

app.use(express.static(__dirname + '/public')); //create server
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html')
});

board.on('ready', function () { //on arduino ready
    console.log('Arduino is ready.');

    let toggle = function (state) { //function to change arduino state depending on the value of the parameter received from the client.on('state')
        console.log("state change phase 2 - " + state)
        state == 0 ? led.write(0) : led.write(1);
    };

    var led = new five.Pin(13); //create led obj

    var currentState;
    // var pin = new five.Pin(13);
    led.read(function (error, value) {
        currentState = value;
        //console.log(currentState);
    });
    // pin.write(1);

    led.write(0); //starting led value

    // Listen to the web socket connection
    io.on('connection', function (client) { //wait for connection
        client.on('join', function (handshake) { //connetion done
            console.log(handshake);

            var myData = {bool: /*0*/currentState}
            client.emit('state', myData); // sempre que um usuario novo entra, piscamos o led e no final o deixamos desligado, resetando assim o range de todos os usuários para 0. O ideal é fazer com que o johnny five descubra o estado do led (0 ou 1), e modifique o estado do cliente que acabou de entrar para o estado correto.
            client.broadcast.emit('state', myData);
        });

        // Every time the user changes the range value, the client sends a "state" command that is listened by the server
        client.on('state', function (data) {

            console.log("state change phase 1");

            toggle(data.bool); //call change function, sending the range value via parameter

            client.emit('state', data); //send the value to client
            client.broadcast.emit('state', data); //send the value to all clients, including the one which the value was sent from
        });

        setInterval(function () { //force refresh ?? é util ??
            var myData = {
                bool: currentState
            }
            client.emit('state', myData); // sempre que um usuario novo entra, piscamos o led e no final o deixamos desligado, resetando assim o range de todos os usuários para 0. O ideal é fazer com que o johnny five descubra o estado do led (0 ou 1), e modifique o estado do cliente que acabou de entrar para o estado correto.
            client.broadcast.emit('state', myData);
        }, 5000);



        client.on('ajax', function () {
            // $.ajax({
            //     url: "http://www.thiagopessia.com/projetos/arduino/",
            //     success: function(data) {
            //         console.log("received");
            //         toggle(data); //call change function, sending the range value via parameter

            //         client.emit('state', data); //send the value to client
            //         client.broadcast.emit('state', data); //send the value to all clients, including the one which the value was sent from
            //     }
            // })
            request('http://www.thiagopessia.com/projetos/arduino/bin.php', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var data = parseInt(body);
                    console.log(data); // Print the body of response.
                    toggle(data); //call change function, sending the range value via parameter

                    client.emit('state', data); //send the value to client
                    client.broadcast.emit('state', data); //send the value to all clients, including the one which the value was sent from
                }
            })
        });
    });
});

const port = process.env.PORT || 3000; //also server creating config

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);