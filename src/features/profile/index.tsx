'use client';

import { useAuth } from '@konlab/auth';
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@konlab/ui/components';
import { useLayoutContext } from '@konlab/ui/layouts/shared';
import { User, Key, Shield } from 'lucide-react';
import { ProfileInfoForm } from './components/profile-info-form';
import { ChangePasswordForm } from './components/change-password-form';
import { TwoFactorAuthForm } from './components/two-factor-auth-form';
import { ProfileHeader } from './components/profile-header';

export function ProfilePage() {
  const { user } = useAuth();
  const { page } = useLayoutContext();
  const { Container: PageContainer, Section: PageSection, Content: PageContent } = page;

  return (
    <PageContainer className="h-full min-h-0">
      {/* Section Top: Avatar và thông tin user */}
      <PageSection className="flex-shrink-0" aria-label="Thông tin người dùng">
        <ProfileHeader user={user} />
      </PageSection>

      {/* Section Bottom: Menu trái và Form phải */}
      <PageSection className="min-h-0 flex-1 p-0" aria-label="Cài đặt tài khoản">
        <Tabs defaultValue="info" className="flex h-full w-full flex-col">
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Menu bên trái */}
            <nav className="w-64 p-4" aria-label="Điều hướng cài đặt">
              <TabsList className="flex h-auto flex-col items-stretch gap-1 bg-transparent p-0">
                <TabsTrigger
                  value="info"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground hover:bg-secondary/50 h-auto w-full justify-start rounded-md px-4 py-3 transition-colors"
                >
                  <User className="mr-3 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Thông tin</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground hover:bg-secondary/50 h-auto w-full justify-start rounded-md px-4 py-3 transition-colors"
                >
                  <Key className="mr-3 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Đổi mật khẩu</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="2fa"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground hover:bg-secondary/50 h-auto w-full justify-start rounded-md px-4 py-3 transition-colors"
                >
                  <Shield className="mr-3 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Xác thực 2 lớp</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </nav>

            <Separator orientation="vertical" className="hidden lg:block" />

            {/* Form bên phải */}
            <PageContent className="flex-1 p-4">
              <TabsContent value="info" className="mt-0">
                <ProfileInfoForm user={user} />
              </TabsContent>

              <TabsContent value="password" className="mt-0">
                <ChangePasswordForm />
              </TabsContent>

              <TabsContent value="2fa" className="mt-0">
                <TwoFactorAuthForm />
              </TabsContent>
            </PageContent>
          </div>
        </Tabs>
      </PageSection>
    </PageContainer>
  );
}
