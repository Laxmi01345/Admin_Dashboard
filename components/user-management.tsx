"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from 'react-toastify';
import { ChevronUp, ChevronDown } from 'lucide-react'

type User = {
  id: number
  username: string
  name: string
  email: string
  password: string
  role: string
  status: "Active" | "Inactive"
}

type SortField = "username" | "name" | "email" | "role" | "status"

const initialUsers: User[] = [
  { id: 1, username: "johndoe", name: "John Doe", email: "john@example.com", password: "password123", role: "Admin", status: "Active" },
  { id: 2, username: "janesmith", name: "Jane Smith", email: "jane@example.com", password: "password456", role: "Editor", status: "Active" },
  { id: 3, username: "bobjohnson", name: "Bob Johnson", email: "bob@example.com", password: "password789", role: "Viewer", status: "Inactive" },
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [newUser, setNewUser] = useState({ username: "", name: "", email: "", password: "", role: "" })
  const [editingUser, setEditingUser] = useState<User | null>(null)


  // Filtering state
  const [filters, setFilters] = useState({
    username: "",
    name: "",
    email: "",
    role: "all",
  })

  // Sorting state
  const [sortField, setSortField] = useState<SortField>("username")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const addUser = () => {
    if (
      newUser.username &&
      newUser.name &&
      newUser.email &&
      newUser.password &&
      newUser.role
    ) {
      setUsers([
        ...users,
        { ...newUser, id: users.length + 1, status: "Active" },
      ]);
      setNewUser({ username: "", name: "", email: "", password: "", role: "" });
      toast.success(`${newUser.name} has been added as a ${newUser.role}`);
    } else {
      toast.error("All fields are required to add a new user.");
    }
  };

  const updateUser = () => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
                ...editingUser,
                password: editingUser.password || user.password,
              }
            : user
        )
      );
      toast.success(`${editingUser.name}'s information has been updated`);
      setEditingUser(null);
    } else {
      toast.error("No user selected for update.");
    }
  };

  const deleteUser = (id: number) => {
    const userToDelete = users.find((user) => user.id === id);
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== id));
      toast.error(`${userToDelete.name} has been removed from the system`);
    } else {
      toast.error("User not found.");
    }
  };

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
    const user = users.find((user) => user.id === id);
    if (user) {
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      toast.info(`${user.name} is now ${newStatus.toLowerCase()}`);
    } else {
      toast.error("User not found.");
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(user =>
        user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        (filters.role === "all" || user.role === filters.role)
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
        if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
        return 0
      })
  }, [users, filters, sortField, sortDirection])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addUser}>Add User</Button>
        </DialogContent>
      </Dialog>
      <div className="mb-4 grid grid-cols-5 gap-4">
        <Input
          placeholder="Filter by username"
          value={filters.username}
          onChange={(e) => setFilters({ ...filters, username: e.target.value })}
        />
        <Input
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <Input
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
        <Select
          value={filters.role}
          onValueChange={(value) => setFilters({ ...filters, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("username")} className="cursor-pointer">
              Username {sortField === "username" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
              Name {sortField === "name" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort("email")} className="cursor-pointer">
              Email {sortField === "email" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort("role")} className="cursor-pointer">
              Role {sortField === "role" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
              Status {sortField === "status" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="edit-username"
                          value={editingUser?.username || ""}
                          onChange={(e) => setEditingUser(prev => prev ? { ...prev, username: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingUser?.name || ""}
                          onChange={(e) => setEditingUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={editingUser?.email || ""}
                          onChange={(e) => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-password" className="text-right">
                          Password
                        </Label>
                        <Input
                          id="edit-password"
                          type="password"
                          placeholder="Leave blank to keep current password"
                          onChange={(e) => setEditingUser(prev => prev ? { ...prev, password: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-role" className="text-right">
                          Role
                        </Label>
                        <Select onValueChange={(value) => setEditingUser(prev => prev ? { ...prev, role: value } : null)}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder={editingUser?.role} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Editor">Editor</SelectItem>
                            <SelectItem value="Viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={updateUser}>Update User</Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant={user.status === "Active" ? "destructive" : "default"}
                  onClick={() => toggleUserStatus(user.id)}
                  className="mr-2"
                >
                  {user.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="destructive" onClick={() => deleteUser(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

