/**
 * ============================================================
 * SmartHub API Client
 * ============================================================
 */

const API = (() => {

    /**
     * Google Apps Script Web App URL
     */
    const BASE_URL =
        "https://script.google.com/macros/s/AKfycbxZDitnkYKQlvxgYMFZUFYxlsuDut3YbVe9---fr1kDRtoIVnwxwdjS4wDu0o40lxe2cA/exec";

    /**
     * Generic GET Request
     */
    async function request(action, params = {}) {

        const url = new URL(BASE_URL);

        url.searchParams.set("action", action);

        Object.entries(params).forEach(([key, value]) => {

            if (value !== undefined && value !== null) {
                url.searchParams.set(key, value);
            }

        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return response.json();

    }

    return {

        /**
         * Staff Directory
         */
        getStaff() {

            return request("staff");

        },

        /**
         * Staff Profile
         */
        getProfile(id) {

            return request("profile", {
                id
            });

        },

        /**
         * Search Staff
         */
        search(keyword) {

            return request("search", {
                keyword
            });

        },

        /**
         * Staff Committee
         */
        getStaffCommittee(staffId) {

            return request("committee", {
                staffId
            });

        }

    };

})();