import supabase from "./supabase";

export async function getReport(role, statusFilter = "all") {
  let query = supabase.from("complaints").select("*");

  if (role === "student") {
    query = query.eq("is_deleted_by_student", false);
  }
  if (role === "admin") {
    query = query.eq("is_deleted_by_admin", false);
  }

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  query = query.order("created_at", { ascending: false });
  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Complaints could not be loaded");
  }

  return data;
}

export async function submitReport(data) {
  const { otherType, complaintType, ...rest } = data;

  const finalComplaintType =
    complaintType === "other" ? otherType : complaintType;

  const { error } = await supabase.from("complaints").insert([
    {
      ...rest,
      complaintType: finalComplaintType,
      status: "pending",
      adminNotifications: "New complaint submitted",
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("Complaints could not be submitted");
  }
  return data;
}

// STATUS AND NOTIFICATIONS

export async function updateStatus({ id, status }) {
  // Define the automatic message based on the new status
  let notificationMessage = "";

  if (status === "resolved") {
    notificationMessage = "✅ Your complaint has been resolved by the admin.";
  } else if (status === "rejected") {
    notificationMessage =
      "❌ Your complaint was rejected. Contact admin for more info.";
  } else {
    notificationMessage = `ℹ️ Your complaint status was updated to '${status}'.`;
  }

  const { data, error } = await supabase
    .from("complaints")
    .update({
      status,
      studentNotifications: notificationMessage,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Failed to update complaint status");
  }

  console.log(notificationMessage);
  return data;
}

// FETCH NOTIFICATION

export async function getNotificationStatus() {
  const { data, error } = await supabase
    .from("complaints")
    .select("id, complaintType, status, studentNotifications, created_at")
    .eq("is_deleted_by_student", false) // optional filter
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Notifications could not be loaded");
  }

  // Optional: Only return complaints that have a notification message
  return data.filter(
    (item) =>
      item.studentNotifications && item.studentNotifications.trim() !== ""
  );
}

// CLEAR NOTIFICATIONS
export async function clearAllStudentNotifications() {
  const { error } = await supabase
    .from("complaints")
    .update({ studentNotifications: null })
    .not("studentNotifications", "is", null); // Only where notifications exist

  if (error) throw new Error("Failed to clear notifications");
}
export async function clearAllAdminNotifications() {
  const { error } = await supabase
    .from("complaints")
    .update({ adminNotifications: null })
    .not("adminNotifications", "is", null); // Only where notifications exist

  if (error) throw new Error("Failed to clear notifications");
}

export async function getAdminNotifications() {
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .not("adminNotifications", "is", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Failed to load admin notifications");
  return data;
}

// MAIN CODEEEEEE
export async function deleteReport(id, role) {
  const column =
    role === "student" ? "is_deleted_by_student" : "is_deleted_by_admin";

  const { data: updateData, error: updateError } = await supabase
    .from("complaints")
    .update({ [column]: true })
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    throw new Error("Complaint could not be soft-deleted");
  }

  const { data, error } = await supabase
    .from("complaints")
    .select("is_deleted_by_student, is_deleted_by_admin")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return updateData;
  }

  if (data.is_deleted_by_student && data.is_deleted_by_admin) {
    const { error: deleteError } = await supabase
      .from("complaints")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      return updateData;
    }
  }

  return updateData;
}
