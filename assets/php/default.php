<!DOCTYPE html>
<html>
<head>
    <!-- Head -->
    @@include('Shared/head.html', {"file":"default","title":"Default","description":"Default..."})
</head>
<body>
    <!-- Header -->
    @@include('Shared/header.html', {"default": "active"})

    <main class="container">
        <div class="row">
            <div class="col s12">
                Conteúdo Principal
            </div>
        </div>
    </main>

    <section>
        <div id="modal" class="modal modal-fixed-footer sm">
            <div class="modal-content">
                <h4>Título Modal</h4>
                <p>Conteudo</p>
                <p>Do</p>
                <p>Modal</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-teal btn-flat">Fechar</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    @@include('Shared/footer.html')

    <!-- SW -> PWA e Offline -->
    <script>
        // if ('serviceWorker' in navigator) {
        //     console.log('CLIENT: service worker registration in progress.');
        //     navigator.serviceWorker.register('/sw.js').then(function() {
        //         console.log('CLIENT: service worker registration complete.');
        //     }, function() {
        //         console.log('CLIENT: service worker registration failure.');
        //     });
        //     } else {
        //     console.log('CLIENT: service worker is not supported.');
        // }
    </script>
</body>
</html>