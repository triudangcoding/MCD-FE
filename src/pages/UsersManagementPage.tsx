import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type MockUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff";
};

const MOCK_USERS: MockUser[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Staff" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Staff" },
];

const getRoleVariant = (role: MockUser["role"]) => {
  switch (role) {
    case "Admin":
      return "destructive" as const;
    case "Manager":
      return "default" as const;
    default:
      return "secondary" as const;
  }
};

const UsersManagementPage: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="text-left py-2 font-medium">User</th>
                  <th className="text-left py-2 font-medium">Email</th>
                  <th className="text-left py-2 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((p) => p[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">{user.email}</td>
                    <td className="py-3">
                      <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagementPage;


