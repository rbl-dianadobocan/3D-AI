import { Header } from "@/components/layout/header";
import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Settings"
        description="Manage your account and preferences"
      />
      <div className="flex-1 p-6">
        <SettingsForm />
      </div>
    </div>
  );
}
