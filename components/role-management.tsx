// Add the "use client" directive at the top of your component file
'use client';  // This will make this component a Client Component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';

type Permission = "Read" | "Write" | "Delete";
type Role = {
  id: number;
  name: string;
  permissions: Permission[];
};

const initialRoles: Role[] = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "Viewer", permissions: ["Read"] },
];

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] as Permission[] });
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const addRole = () => {
    if (newRole.name) {
      setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
      setNewRole({ name: "", permissions: [] });
      toast.success(`${newRole.name} role has been created`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const updateRole = () => {
    if (editingRole) {
      setRoles(roles.map(role => role.id === editingRole.id ? editingRole : role));
      setEditingRole(null);
      toast.success(`${editingRole.name} role has been updated`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
    toast.error("Role deleted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const togglePermission = (roleId: number, permission: Permission) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const updatedPermissions = role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions: updatedPermissions };
      }
      return role;
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Role Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Role</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Role Name
              </Label>
              <Input
                id="name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Permissions</Label>
              <div className="col-span-3">
                {["Read", "Write", "Delete"].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`permission-${permission}`}
                      checked={newRole.permissions.includes(permission as Permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRole({ ...newRole, permissions: [...newRole.permissions, permission as Permission] });
                        } else {
                          setNewRole({ ...newRole, permissions: newRole.permissions.filter(p => p !== permission) });
                        }
                      }}
                    />
                    <label htmlFor={`permission-${permission}`}>{permission}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button onClick={addRole}>Add Role</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Read</TableHead>
            <TableHead>Write</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                <Checkbox
                  checked={role.permissions.includes("Read")}
                  onCheckedChange={() => togglePermission(role.id, "Read")}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={role.permissions.includes("Write")}
                  onCheckedChange={() => togglePermission(role.id, "Write")}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={role.permissions.includes("Delete")}
                  onCheckedChange={() => togglePermission(role.id, "Delete")}
                />
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Role</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Role Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingRole?.name || ""}
                          onChange={(e) => setEditingRole(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Permissions</Label>
                        <div className="col-span-3">
                          {["Read", "Write", "Delete"].map((permission) => (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-permission-${permission}`}
                                checked={editingRole?.permissions.includes(permission as Permission)}
                                onCheckedChange={(checked) => {
                                  if (editingRole) {
                                    if (checked) {
                                      setEditingRole({ ...editingRole, permissions: [...editingRole.permissions, permission as Permission] });
                                    } else {
                                      setEditingRole({ ...editingRole, permissions: editingRole.permissions.filter(p => p !== permission) });
                                    }
                                  }
                                }}
                              />
                              <label htmlFor={`edit-permission-${permission}`}>{permission}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button onClick={updateRole}>Update Role</Button>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => deleteRole(role.id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
