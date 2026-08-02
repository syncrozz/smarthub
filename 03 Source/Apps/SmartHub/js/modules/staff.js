   
   /**
 * ============================================================
 * Staff Module
 * ============================================================
 */

const Staff = (() => {

    let staffData = [];
    let filteredData = [];
    let searchTimer = null;
   
   /**
     * ============================================================
     * INIT
     * ============================================================
     */

    async function init() {

        try {

            console.log("📋 Loading staff...");

            const data = await API.getStaff();

            initPage(data);

            console.log(`✅ ${staffData.length} staff loaded`);

        } catch (err) {

            showError(err);

        }

    }

    function initPage(data) {

        staffData = Array.isArray(data)
            ? data
            : [];

        filteredData = [...staffData];

        updateDashboard();

        populateDepartmentFilter();

        renderStaff(filteredData);

        updateLastSync();

        registerEvents();

    }
    

    /**
     * ============================================================
     * DASHBOARD
     * ============================================================
     */

    function updateDashboard() {

        const totalStaff =
            document.getElementById("totalStaff");

        if (totalStaff) {

            totalStaff.textContent =
                staffData.length;

        }

        const departments = new Set();

        staffData.forEach(staff => {

            const bahagian =
                String(staff.bahagian || "").trim();

            if (bahagian) {

                departments.add(bahagian);

            }

        });

        const totalDept =
            document.getElementById("totalDept");

        if (totalDept) {

            totalDept.textContent =
                departments.size;

        }

    }

/**
     * ============================================================
     * LAST SYNC
     * ============================================================
     */

    function updateLastSync() {

        const el =
            document.getElementById("lastSync");

        if (!el) return;

        el.textContent =
            "Last Update : " +
            new Date().toLocaleString("en-GB");

    }

        /**
     * ============================================================
     * SEARCH & FILTER
     * ============================================================
     */

    function applyFilters() {

        const keyword =
            (document.getElementById("searchInput")?.value || "")
                .trim()
                .toLowerCase();

        const department =
            document.getElementById("departmentFilter")?.value || "";

        filteredData = staffData.filter(staff => {

            const matchKeyword =

                (staff.nama || "").toLowerCase().includes(keyword) ||
                (staff.jawatan || "").toLowerCase().includes(keyword) ||
                (staff.gred || "").toLowerCase().includes(keyword) ||
                (staff.bahagian || "").toLowerCase().includes(keyword) ||
                (staff.email || "").toLowerCase().includes(keyword) ||
                (staff.telefon || "").toLowerCase().includes(keyword) ||
                (staff.pengkhususan || "").toLowerCase().includes(keyword) ||
                (staff.daerahAsal || "").toLowerCase().includes(keyword) ||
                String(staff.tahunLahir || "").toLowerCase().includes(keyword) ||
                String(staff.platNo1 || "").toLowerCase().includes(keyword) ||
                String(staff.platNo2 || "").toLowerCase().includes(keyword) ||
                String(staff.platNo3 || "").toLowerCase().includes(keyword);

            const matchDepartment =

                !department ||

                staff.bahagian === department;

            return matchKeyword && matchDepartment;

        });

        renderStaff(filteredData);

    }

/**
     * ============================================================
     * HELPER
     * ============================================================
     */

    function getDepartmentShortName(department) {

        if (!department) return "-";

        const map = {

            "Bahagian Pengurusan":"Pengurusan",
            "Jabatan Pengajian Am":"Pengajian Am",
            "Jabatan Pengurusan Perniagaan":"Pengurusan Perniagaan",
            "Jabatan Perakaunan":"Perakaunan",
            "Jabatan Sains Kuantitatif":"Sains Kuantitatif",
            "Unit Kaunseling":"Kaunseling",
            "Unit Ko-Kurikulum":"Ko-Kurikulum",
            "Unit Felo":"Felo"

        };

        return map[department] || department;

    }

    function getDepartmentClass(department) {

        if (!department) return "dept-default";

        const map = {

            "Bahagian Pengurusan":"dept-management",
            "Jabatan Pengajian Am":"dept-academic",
            "Jabatan Pengurusan Perniagaan":"dept-business",
            "Jabatan Perakaunan":"dept-accounting",
            "Jabatan Sains Kuantitatif":"dept-quantitative",
            "Unit Kaunseling":"dept-counselling",
            "Unit Ko-Kurikulum":"dept-cocurriculum",
            "Unit Felo":"dept-fellow"

        };

        return map[department] || "dept-default";

    }

    function getGradeClass(grade) {

        if (!grade) return "";

        return "grade-" +
            String(grade).toLowerCase();

    }


      /**
     * ============================================================
     * RENDER STAFF
     * ============================================================
     */

    function renderStaff(data) {

        const container =
            document.getElementById("staffList");

        if (!container) return;

        if (!data || data.length === 0) {

            container.innerHTML = `

                <div class="col-12">

                    <div class="empty text-center py-5">

                        <i class="bi bi-search fs-1"></i>

                        <h4 class="mt-3">

                            Tiada Rekod Dijumpai

                        </h4>

                        <p>

                            Cuba ubah carian atau penapis.

                        </p>

                    </div>

                </div>

            `;

        } else {

            container.innerHTML =
                data
                    .map(createStaffCard)
                    .join("");

        }

        const badge =
            document.getElementById("staffCount");

        if (badge) {

            badge.textContent = data.length;

        }

    }
     

    /**
     * ============================================================
     * STAFF CARD
     * ============================================================
     */

    function createStaffCard(staff) {

        return `

<div class="col-12 col-md-6 col-xl-3 mb-4">

<div
    class="staff-card fade-in"
    role="button"
    tabindex="0"
    onclick="Staff.showProfile('${staff.id}')">

    <div class="d-flex justify-content-between align-items-start mb-3">

        <div class="d-flex gap-2 flex-wrap">

            <span class="badge-grade ${getGradeClass(staff.gred)}">
                ${staff.gred || "-"}
            </span>

            <span class="badge-department ${getDepartmentClass(staff.bahagian)}">
                ${getDepartmentShortName(staff.bahagian)}
            </span>

        </div>

        <div class="staff-arrow">
            <i class="bi bi-chevron-right"></i>
        </div>

    </div>

    <div class="d-flex align-items-center">

        <img
            src="${staff.photo}"
            class="staff-avatar me-3"
            loading="lazy"
            onerror="this.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'">

        <div class="flex-grow-1">

            <h3 class="staff-name">
                ${staff.nama || "-"}
            </h3>

            <div class="staff-position">
                ${staff.jawatan || "-"}
            </div>

        </div>

    </div>

    <div class="staff-contact mt-4">

        <div class="contact-chip">

            <i class="bi bi-telephone"></i>

            <a
                href="tel:${staff.telefon}"
                class="text-decoration-none">

                ${staff.telefon || "-"}

            </a>

        </div>

        <div class="contact-chip">
            ${staff.sambungan || "-"}
        </div>

    </div>

</div>

</div>

`;

    }

        /**
     * ============================================================
     * PROFILE
     * ============================================================
     */

    function formatList(text) {

        return (text || "-")
            .replace(/,\s*(\d+\s*-\s*)/g, "<br>$1");

    }

    async function showProfile(id) {

        try {

            const staff = staffData.find(
                x => String(x.id) === String(id)
            );

           if (!staff) return;

const get = (id) => {
    const el = document.getElementById(id);

    console.log(id, el);

    if (!el) {
        throw new Error(`Element tidak dijumpai: ${id}`);
    }

    return el;
};

get("modalNama").textContent =
    staff.nama || "-";

get("modalJawatan").textContent =
    staff.jawatan || "-";

get("modalJawatanInfo").textContent =
    staff.jawatan || "-";

get("modalGred").textContent =
    staff.gred || "-";

get("modalPhoto").src =
    staff.photo || CONFIG.DEFAULT_AVATAR;

get("modalBahagian").textContent =
    staff.bahagian || "-";

get("modalTelefon").textContent =
    staff.telefon || "-";

get("modalKelulusan").innerHTML =
    formatList(staff.kelulusan);

get("modalPengkhususan").innerHTML =
    formatList(staff.pengkhususan);

get("modalDaerahAsal").textContent =
    staff.daerahAsal || "-";

const email = get("modalEmail");

            if (staff.email) {

                email.innerHTML = `
                    <a href="mailto:${staff.email}">
                        ${staff.email}
                    </a>
                `;

            } else {

                email.textContent = "-";

            }

            const whatsapp =
                document.getElementById("modalWhatsapp");

            if (staff.whatsapp) {

                whatsapp.innerHTML = `
                    <a
                        class="btn btn-success btn-sm"
                        target="_blank"
                        href="https://wa.me/${staff.whatsapp}">

                        <i class="bi bi-whatsapp"></i>

                        WhatsApp

                    </a>
                `;

            } else {

                whatsapp.textContent = "-";

            }

            document
    .getElementById("btnCommittee")
    .onclick = () => {

        console.log("🔥 NEW STAFF.JS");

        Committee.show(staff);

    };

            new bootstrap.Modal(
                document.getElementById("profileModal")
            ).show();

        } catch (err) {

            showError(err);

        }

    }

    /**
     * ============================================================
     * ERROR
     * ============================================================
     */

    function showError(err) {

        console.error(err);

        const container =
            document.getElementById("staffList");

        if (!container) return;

        container.innerHTML = `

        <div class="col-12">

            <div class="alert alert-danger">

                <h5>

                    <i class="bi bi-exclamation-triangle"></i>

                    Ralat Memuatkan Data

                </h5>

                <hr>

                ${err.message || err}

            </div>

        </div>

        `;

    }



    /**
     * ============================================================
     * EVENT
     * ============================================================
     */

    function registerEvents() {

        const searchInput =
            document.getElementById("searchInput");

        if (searchInput) {

            searchInput.addEventListener("input", () => {

                clearTimeout(searchTimer);

                searchTimer = setTimeout(
                    applyFilters,
                    250
                );

            });

        }

        const departmentFilter =
            document.getElementById("departmentFilter");

        if (departmentFilter) {

            departmentFilter.addEventListener(
                "change",
                applyFilters
            );

        }

    }

    /**
     * ============================================================
     * RESET
     * ============================================================
     */

    function resetToolbar() {

        const search =
            document.getElementById("searchInput");

        if (search) {

            search.value = "";

        }

        const department =
            document.getElementById("departmentFilter");

        if (department) {

            department.value = "";

        }

        filteredData = [...staffData];

        renderStaff(filteredData);

    }

    /**
     * ============================================================
     * DEPARTMENT FILTER
     * ============================================================
     */

    function populateDepartmentFilter() {

        const select =
            document.getElementById(
                "departmentFilter"
            );

        if (!select) return;

        const departments = [

            ...new Set(

                staffData

                    .map(
                        x => x.bahagian
                    )

                    .filter(Boolean)

            )

        ].sort();

        select.innerHTML =

            `<option value="">
                Semua Bahagian
            </option>`;

        departments.forEach(dept => {

            select.innerHTML +=

                `<option value="${dept}">
                    ${dept}
                </option>`;

        });

    }

    return {

    init,

    showProfile,

    resetToolbar,

    getAll() {

        return staffData;

    },

    getFiltered() {

        return filteredData;

    }

}

})();