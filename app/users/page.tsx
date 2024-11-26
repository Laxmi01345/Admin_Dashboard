import { SideNavbar } from "@/components/side-navbar";
import { UserManagement } from "@/components/user-management";

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <SideNavbar/>
      <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <UserManagement/>
      </main>
    </div>
  )
}

