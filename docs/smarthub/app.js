/* =========================================================
   SYNCROZZ FRONTEND ENGINE (SFE)
   Version : 1.0
========================================================= */

class SyncrozzApp {

    async init() {

        console.log("🚀 SmartHub Initializing...");

        await this.loadCoreComponents();

        await Staff.init();

        console.log("✅ SmartHub Ready");

    }

    async loadCoreComponents() {

        await ComponentLoader.load(
            "components/dashboard/index.html",
            "#dashboard-container"
        );

        await ComponentLoader.load(
            "components/profile/modal.html",
            "#profile-modal-container"
        );

        await ComponentLoader.load(
            "components/committee/modal.html",
            "#committee-modal-container"
        );

    }

}

/* =========================================================
   COMPONENT LOADER
========================================================= */

class ComponentLoader {

    static async load(path, target) {

        console.log("📦 Loading:", path);

        const response = await fetch(path);

        console.log("📡 Status:", response.status);

        if (!response.ok) {

            console.error(`❌ Component not found: ${path}`);

            return;

        }

        const html = await response.text();

        console.log("📄 HTML Length:", html.length);

        const container = document.querySelector(target);

        console.log("📍 Container:", container);

        if (!container) {

            console.error(`❌ Target container not found: ${target}`);

            return;

        }

        container.innerHTML = html;

        console.log("✅ Loaded:", path);

    }

}

/* =========================================================
   APP START
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    const app = new SyncrozzApp();

    await app.init();

});