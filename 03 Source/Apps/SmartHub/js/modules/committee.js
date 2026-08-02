/**
 * ============================================================
 * SmartHub
 * Committee Module
 * ============================================================
 */

const Committee = (() => {

    let modal = null;

    function show(staff) {

        debugger;

        console.log("✅ Committee.show()", staff);

        if (!staff || !staff.id) {
            console.error("Committee.show(): Invalid staff.");
            return;
        }

        API.getStaffCommittee(staff.id)

    .then(data => {

        console.log("Committee Response:", data);

        render(data);

    })

            .catch(error => {

                console.error(error);

                const container =
                    document.getElementById("committeeContent");

                container.innerHTML = `
                    <div class="alert alert-danger">
                        Gagal memuatkan jawatan & keahlian.
                    </div>
                `;

                open();

            });

    }

    function render(data) {

        const container =
            document.getElementById("committeeContent");

        container.innerHTML = "";

        document.getElementById("committeeNama").textContent =
            document.getElementById("modalNama").textContent;

        if (!data || data.length === 0) {

            container.innerHTML = `
                <div class="alert alert-warning">
                    Tiada rekod jawatan ditemui.
                </div>
            `;

            open();

            return;

        }

        data.sort(
            (a, b) =>
                getPriority(a.Jawatan) -
                getPriority(b.Jawatan)
        );

        data.forEach(item => {

            container.insertAdjacentHTML(
                "beforeend",
                `
                <div class="card mb-3 shadow-sm">

                    <div class="card-body">

                        <span class="committee-badge">

                            ${item.Kategori}

                        </span>

                        <h5 class="mt-3">

                            ${item.Jawatan}

                        </h5>

                        <p class="text-muted mb-1">

                            <i class="bi bi-building"></i>

                            ${item.Unit}

                        </p>

                        <small>

                            Tahun : ${item.Tahun}

                        </small>

                    </div>

                </div>
                `
            );

        });

        open();

    }

    function open() {

        bootstrap.Modal
            .getInstance(
                document.getElementById("profileModal")
            )
            ?.hide();

        if (!modal) {

            modal = new bootstrap.Modal(

                document.getElementById("committeeModal")

            );

        }

        modal.show();

    }

    function close() {

        if (modal) {

            modal.hide();

        }

    }

    function getPriority(jawatan) {

        jawatan = (jawatan || "").toLowerCase();

        if (jawatan.includes("pengerusi")) return 1;
        if (jawatan.includes("timbalan pengerusi")) return 2;
        if (jawatan.includes("naib pengerusi")) return 3;

        if (jawatan.includes("pengarah")) return 5;

        if (jawatan.includes("penasihat")) return 10;

        if (jawatan.includes("ketua felo")) return 20;
        if (jawatan.includes("ketua")) return 21;

        if (jawatan.includes("setiausaha")) return 30;
        if (jawatan.includes("bendahari")) return 40;

        if (jawatan.includes("penyelaras")) return 50;
        if (jawatan.includes("koordinator")) return 51;

        if (jawatan.includes("ajk")) return 90;
        if (jawatan.includes("ahli")) return 100;

        return 999;

    }

    return {

        show,
        close

    };

})();