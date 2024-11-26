import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, UserCircle, Shield, Search, HelpCircle, Settings } from 'lucide-react'

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, Admin User!</h1>
        <p className="text-gray-500">Secure your system, one click at a time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">890</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles Created</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 new roles this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <Input className="max-w-sm" type="text" placeholder="Search users, roles, or permissions..." />
        <Button>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>User JohnDoe was deactivated by AdminUser</li>
              <li>Role 'Editor' permissions were updated</li>
              <li>New user JaneSmith was created</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add New User
            </Button>
            <Button>
              <UserCircle className="mr-2 h-4 w-4" /> Create Role
            </Button>
            <Button>
              <Shield className="mr-2 h-4 w-4" /> Manage Permissions
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Helpful Links</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Button variant="outline">
            <HelpCircle className="mr-2 h-4 w-4" /> Documentation
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" /> System Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

