"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from 'react-toastify';

type Permission = {
  id: number
  name: string
  description: string
}

const initialPermissions: Permission[] = [
  { id: 1, name: "Read", description: "Can view content" },
  { id: 2, name: "Write", description: "Can create and edit content" },
  { id: 3, name: "Delete", description: "Can remove content" },
]

export function PermissionManagement() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)
  const [newPermission, setNewPermission] = useState({ name: "", description: "" })
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  


const addPermission = () => {
  if (newPermission.name && newPermission.description) {
    setPermissions([
      ...permissions,
      { ...newPermission, id: permissions.length + 1 },
    ]);
    setNewPermission({ name: "", description: "" });
    toast.success(`${newPermission.name} permission has been successfully created.`);
  } else {
    toast.error("Both name and description are required.");
  }
};

const updatePermission = () => {
  if (editingPermission) {
    setPermissions(
      permissions.map((permission) =>
        permission.id === editingPermission.id ? editingPermission : permission
      )
    );
    toast.success(`${editingPermission.name} permission has been successfully updated.`);
    setEditingPermission(null);
  } else {
    toast.error("No permission selected for editing.");
  }
};

const deletePermission = (id: number) => {
  const permissionToDelete = permissions.find((permission) => permission.id === id);
  if (permissionToDelete) {
    setPermissions(permissions.filter((permission) => permission.id !== id));
    toast.info(`${permissionToDelete.name} has been removed from the system.`);
  } else {
    toast.error("Permission not found.");
  }
};


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Permission Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Permission</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Permission</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Permission Name
              </Label>
              <Input
                id="name"
                value={newPermission.name}
                onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newPermission.description}
                onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={addPermission}>Add Permission</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.description}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Permission</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Permission Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingPermission?.name || ""}
                          onChange={(e) => setEditingPermission(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="edit-description"
                          value={editingPermission?.description || ""}
                          onChange={(e) => setEditingPermission(prev => prev ? { ...prev, description: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={updatePermission}>Update Permission</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deletePermission(permission.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

