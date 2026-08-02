/*
============================================================
SYNCROZZ PWA Install Engine v1.0
============================================================
*/

const PWAInstall = (() => {

    let deferredPrompt = null;

    function init() {

        // App sudah dipasang
        if (
            window.matchMedia("(display-mode: standalone)").matches
            || window.navigator.standalone
        ) {
            return;
        }

        window.addEventListener(
            "beforeinstallprompt",
            (e) => {

                e.preventDefault();

                deferredPrompt = e;

                showInstallDialog();

            }
        );

    }

    function showInstallDialog() {

        const installed =
            localStorage.getItem("smarthub-install-dismiss");

        if (installed) return;

        setTimeout(() => {

            if (
                confirm(
`📱 Install KPMBP SmartHub?

Install ke Home Screen untuk akses lebih pantas.`
                )
            ) {

                install();

            } else {

                localStorage.setItem(
                    "smarthub-install-dismiss",
                    Date.now()
                );

            }

        }, 1500);

    }

    async function install() {

        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

    }

    return {

        init

    };

})();

window.PWAInstall = PWAInstall;