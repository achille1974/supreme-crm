import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Dashboard DISATTIVATA.
  // Il CRM parte direttamente dalla lista tabaccai.
  redirect("/tabaccai");
}
