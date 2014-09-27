(function ($) {
    var app = {
        code: 12,
        A: null,

        initialize: function() {
            A = this;
            this.bindEvents();
        },

        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            $('body').on('click tap touch', '.start-scanning', A.scan);
        },

        send: function (code) {
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:3131/checkin',
                data: {
                    code: code
                },

                complete: function () {
                    console.log(arguments);
                },
                async: false
            });
        },

        scan: function () {
            A.code = A.code * 2;
            A.send(A.code);
            // cordova.plugins.barcodeScanner.scan(
            //     function (result) {
            //         $('.result').append(result.text + '<hr>');
            //         A.send(result.text);
            //     },
            //     function (error) {
            //         console.log(error);
            //     }
            // );
        },

        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },

        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    };

    $(function () {
        app.initialize();
    });

}(window.jQuery || window.$));
