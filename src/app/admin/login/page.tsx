import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Login — Mini Shop" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-gray-500">Mini Shop Dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
