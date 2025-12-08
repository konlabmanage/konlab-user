'use client';

import { useState } from 'react';
import { Button, Switch } from '@konlab/ui/components';
import { useLayoutContext } from '@konlab/ui/layouts/shared';
import { toast } from 'sonner';
import { Shield, Smartphone, Key } from 'lucide-react';

export function TwoFactorAuthForm() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const { page } = useLayoutContext();
  const { Header: PageHeader, Title: PageTitle, Subtitle: PageSubtitle } = page;

  const handleToggle2FA = async (enabled: boolean) => {
    if (enabled && isEnabled) {
      // Already enabled, do nothing
      return;
    }

    if (!enabled && isEnabled) {
      // Disabling 2FA
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsEnabled(false);
        setShowSetup(false);
        setQrCode(null);
        setSecret(null);

        toast.success('Đã tắt xác thực 2 lớp');
      } catch (error) {
        toast.error('Có lỗi xảy ra khi tắt xác thực 2 lớp');
        console.error('Error disabling 2FA:', error);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Enabling 2FA - show setup
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call to get QR code and secret
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSetup(true);
      // TODO: Get QR code and secret from API
      setQrCode(
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RUiBDb2RlIFBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==',
      );
      setSecret('JBSWY3DPEHPK3PXP');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi lấy mã QR');
      console.error('Error getting 2FA setup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Mã xác thực phải có 6 chữ số');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsEnabled(true);
      setShowSetup(false);
      setVerificationCode('');
      setQrCode(null);
      setSecret(null);

      toast.success('Xác thực thành công! Xác thực 2 lớp đã được kích hoạt.');
    } catch (error) {
      toast.error('Mã xác thực không đúng');
      console.error('Error verifying 2FA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageTitle level={2}>Xác thực 2 lớp</PageTitle>
        <PageSubtitle>
          Bảo vệ tài khoản của bạn bằng xác thực 2 lớp. Bạn sẽ cần nhập mã từ ứng dụng xác thực mỗi
          khi đăng nhập.
        </PageSubtitle>
      </PageHeader>

      <div className="space-y-6">
        {/* Toggle Switch */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Shield className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="font-medium">Xác thực 2 lớp</p>
              <p className="text-muted-foreground text-sm">
                {isEnabled
                  ? 'Đã bật - Tài khoản của bạn được bảo vệ'
                  : 'Đã tắt - Tài khoản của bạn chưa được bảo vệ'}
              </p>
            </div>
          </div>
          <Switch checked={isEnabled} onCheckedChange={handleToggle2FA} disabled={isLoading} />
        </div>

        {/* Setup Instructions */}
        {showSetup && (
          <div className="rounded-lg border p-6">
            <div className="mb-4">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <Smartphone className="h-5 w-5" />
                Thiết lập xác thực 2 lớp
              </h3>
              <p className="text-muted-foreground text-sm">
                Quét mã QR bằng ứng dụng xác thực như Google Authenticator hoặc Authy
              </p>
            </div>
            <div className="space-y-4">
              {/* QR Code */}
              {qrCode && (
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-lg border p-4">
                    <img src={qrCode} alt="QR Code" className="h-48 w-48" />
                  </div>
                  {secret && (
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Hoặc nhập mã thủ công:</p>
                      <p className="mt-1 font-mono text-lg font-semibold">{secret}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Verification Code Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Nhập mã xác thực để kích hoạt</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="border-input focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-center font-mono text-lg tracking-widest shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyAndEnable}
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Xác thực
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enabled State */}
        {isEnabled && !showSetup && (
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
              <Shield className="h-5 w-5" />
              <p className="font-medium">Xác thực 2 lớp đã được kích hoạt</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Tài khoản của bạn đang được bảo vệ bằng xác thực 2 lớp. Bạn có thể tắt tính năng này
              bất cứ lúc nào.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
