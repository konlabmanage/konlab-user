'use client';

import { useAuth } from '@konlab/auth';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@konlab/ui/components';
import { SetBreadcrumbs } from '@konlab/ui/layouts/shared';
import { User, Phone, Mail, Briefcase } from 'lucide-react';
import { ProfileInfoForm } from '@konlab/user/features/profile/profile-info-form';
import { ChangePasswordForm } from '@konlab/user/features/profile/change-password-form';
import { TwoFactorAuthForm } from '@konlab/user/features/profile/two-factor-auth-form';

export default function ProfilePage() {
  const { user } = useAuth();

  // Get user initials for avatar fallback
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const displayName = user?.name || user?.preferred_username || 'Người dùng';
  const email = user?.email || 'Chưa có email';
  const phone = (user as any)?.phone || 'Chưa có số điện thoại';
  const position = (user as any)?.position || (user as any)?.job_title || 'Chưa có chức vụ';

  return (
    <>
      <SetBreadcrumbs items={[{ label: 'Trang chủ', href: '/' }, { label: 'Hồ sơ' }]} />

      <div className="flex flex-col gap-6">
        {/* Section Top: Avatar và thông tin user */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={(user as any)?.avatar} alt={displayName} />
                <AvatarFallback className="text-2xl">{getInitials(displayName)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-1 flex-col gap-4 text-center md:text-left">
                <div>
                  <h1 className="text-2xl font-semibold">{displayName}</h1>
                  <p className="text-muted-foreground mt-1 text-sm">{position}</p>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:gap-6">
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">{phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">{email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">{position}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Bottom: Menu trái và Form phải */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="info" className="w-full">
              <div className="flex flex-col gap-6 lg:flex-row">
                {/* Menu bên trái */}
                <div className="lg:w-64">
                  <TabsList className="flex h-auto flex-col items-start bg-transparent p-0">
                    <TabsTrigger
                      value="info"
                      className="data-[state=active]:bg-accent w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Thông tin
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      className="data-[state=active]:bg-accent w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Đổi mật khẩu
                    </TabsTrigger>
                    <TabsTrigger
                      value="2fa"
                      className="data-[state=active]:bg-accent w-full justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Xác thực 2 lớp
                    </TabsTrigger>
                  </TabsList>
                </div>

                <Separator orientation="vertical" className="hidden lg:block" />

                {/* Form bên phải */}
                <div className="flex-1">
                  <TabsContent value="info" className="mt-0">
                    <ProfileInfoForm user={user} />
                  </TabsContent>

                  <TabsContent value="password" className="mt-0">
                    <ChangePasswordForm />
                  </TabsContent>

                  <TabsContent value="2fa" className="mt-0">
                    <TwoFactorAuthForm />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
