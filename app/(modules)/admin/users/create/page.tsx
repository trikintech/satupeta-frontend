import { Card, CardContent } from "@/shared/components/ui/card";

import { UserForm } from "../components/user-form";

export default function CreateUserPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <Card title="User Form" className="w-full">
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>
    </div>
  );
}
