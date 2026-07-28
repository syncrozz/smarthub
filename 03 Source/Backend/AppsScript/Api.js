/**
 * ============================================================
 * SmartHub API Router
 * ============================================================
 */

function apiRouter(e) {

  const action = e.parameter.action || "";

  switch (action) {

    case "staff":

      return jsonOutput(
        getStaff()
      );

    case "profile":

      return jsonOutput(

        getStaff().find(

          s => String(s.id) === String(e.parameter.id)

        )

      );

    case "search": {

      const keyword =
        (e.parameter.keyword || "").toLowerCase();

      return jsonOutput(

        getStaff().filter(staff =>

          String(staff.nama)
            .toLowerCase()
            .includes(keyword)

        )

      );

    }

    case "committee":

      return jsonOutput(

        getStaffCommittee(
          e.parameter.staffId
        )

      );

    default:

      return jsonOutput({

        success: false,

        message: "Unknown API"

      });

  }

}