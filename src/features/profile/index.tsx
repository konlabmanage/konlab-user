'use client';

import { useAuth } from '@konlab/auth';
import {
  Card,
  CardContent,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@konlab/ui/components';
import { useLayoutContext } from '@konlab/ui/layouts/shared';
import { User } from 'lucide-react';
import { ProfileInfoForm } from './components/profile-info-form';
import { ChangePasswordForm } from './components/change-password-form';
import { TwoFactorAuthForm } from './components/two-factor-auth-form';
import { ProfileHeader } from './components/profile-header';

export function ProfilePage() {
  const { user } = useAuth();
  const { page } = useLayoutContext();
  const { Container: PageContainer, Section: PageSection, Content: PageContent } = page;

  return (
    <PageContainer>
      {/* Section Top: Avatar và thông tin user */}
      <PageSection>
        <ProfileHeader user={user} />
      </PageSection>

      {/* Section Bottom: Menu trái và Form phải */}
      <PageSection>
            <Tabs defaultValue="info" className="w-full">
              <div className="flex flex-col gap-6 lg:flex-row">
                {/* Menu bên trái */}
                <div className="lg:w-64">
                  <TabsList className="flex h-auto flex-col items-start bg-transparent p-0">
                    <TabsTrigger
                      value="info"
                      // className="data-[state=active]:bg-accent w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Thông tin
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      // className="data-[state=active]:bg-accent w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Đổi mật khẩu
                    </TabsTrigger>
                    <TabsTrigger
                      value="2fa"
                      // className="data-[state=active]:bg-accent w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Xác thực 2 lớp
                    </TabsTrigger>
                  </TabsList>
                </div>

                <Separator orientation="vertical" className="hidden lg:block" />

                {/* Form bên phải */}
                <PageContent>
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
