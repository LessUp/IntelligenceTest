'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Loader2, CheckCircle2, XCircle, RefreshCw, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';

interface WeChatLoginProps {
  onSuccess?: (userInfo: any) => void;
  onCancel?: () => void;
}

type LoginStatus = 'pending' | 'scanned' | 'confirmed' | 'expired' | 'error';

export function WeChatLogin({ onSuccess, onCancel }: WeChatLoginProps) {
  const { language } = useTestStore();
  const [status, setStatus] = useState<LoginStatus>('pending');
  const [qrCode, setQrCode] = useState<string>('');
  const [countdown, setCountdown] = useState(120);

  const texts: Record<string, { en: string; zh: string }> = {
    title: { en: 'WeChat Login', zh: '微信登录' },
    pending: { en: 'Scan QR code with WeChat', zh: '使用微信扫描二维码' },
    scanQR: { en: 'Scan QR code with WeChat', zh: '使用微信扫描二维码' },
    scanned: { en: 'Scanned, confirm on phone', zh: '已扫描，请在手机上确认' },
    confirmed: { en: 'Login successful!', zh: '登录成功！' },
    expired: { en: 'QR code expired', zh: '二维码已过期' },
    error: { en: 'Login failed', zh: '登录失败' },
    refresh: { en: 'Refresh', zh: '刷新' },
    cancel: { en: 'Cancel', zh: '取消' },
    expiresIn: { en: 'Expires in', zh: '有效期' },
    seconds: { en: 's', zh: '秒' },
    tip: { en: 'Open WeChat and scan', zh: '打开微信扫一扫' },
  };

  // 生成模拟的登录URL
  const generateQRUrl = () => {
    const uuid = Math.random().toString(36).substring(7);
    // 实际项目中这里应该调用后端获取微信OAuth URL
    return `https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_APPID&redirect_uri=YOUR_CALLBACK&state=${uuid}`;
  };

  useEffect(() => {
    setQrCode(generateQRUrl());
    setCountdown(120);
    setStatus('pending');
  }, []);

  // 倒计时
  useEffect(() => {
    if (status === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setStatus('expired');
    }
  }, [countdown, status]);

  // 模拟轮询检查扫码状态 (实际项目中应该调用后端API)
  useEffect(() => {
    if (status === 'pending') {
      // 模拟: 10秒后变为已扫描
      const mockScan = setTimeout(() => {
        // setStatus('scanned');
      }, 10000);
      return () => clearTimeout(mockScan);
    }
  }, [status]);

  const handleRefresh = () => {
    setQrCode(generateQRUrl());
    setCountdown(120);
    setStatus('pending');
  };

  const statusConfig = {
    pending: { icon: null, color: 'text-slate-500' },
    scanned: { icon: Smartphone, color: 'text-green-500' },
    confirmed: { icon: CheckCircle2, color: 'text-green-500' },
    expired: { icon: XCircle, color: 'text-red-500' },
    error: { icon: XCircle, color: 'text-red-500' },
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="flex flex-col items-center p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .241-.11.241-.245 0-.06-.024-.119-.04-.178l-.325-1.233a.492.492 0 01.178-.554c1.521-1.125 2.51-2.78 2.51-4.617 0-3.39-3.407-6.126-7.07-6.126zm-2.164 3.684a.973.973 0 11.002 1.946.973.973 0 01-.002-1.946zm4.329 0a.973.973 0 11.002 1.946.973.973 0 01-.002-1.946z"/>
        </svg>
        {texts.title[language]}
      </h3>
      
      <p className={cn("text-sm mb-4", statusConfig[status].color)}>
        {texts[status][language]}
      </p>

      {/* QR Code */}
      <div className={cn(
        "relative p-4 bg-white rounded-2xl border-2 border-slate-200 mb-4",
        status === 'expired' && "opacity-50"
      )}>
        <QRCodeSVG 
          value={qrCode}
          size={180}
          level="M"
          includeMargin
        />
        
        {/* Overlay for different states */}
        {status !== 'pending' && status !== 'scanned' && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl">
            {StatusIcon && (
              <StatusIcon size={48} className={statusConfig[status].color} />
            )}
            {status === 'expired' && (
              <button
                onClick={handleRefresh}
                className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                <RefreshCw size={16} />
                {texts.refresh[language]}
              </button>
            )}
          </div>
        )}

        {status === 'scanned' && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl">
            <Loader2 size={32} className="text-green-500 animate-spin" />
            <p className="mt-2 text-sm text-green-600 font-medium">
              {texts.scanned[language]}
            </p>
          </div>
        )}
      </div>

      {/* Countdown */}
      {status === 'pending' && (
        <p className="text-xs text-slate-400 mb-4">
          {texts.expiresIn[language]}: {countdown}{texts.seconds[language]}
        </p>
      )}

      {/* Tip */}
      <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-full">
        <Smartphone size={16} />
        {texts.tip[language]}
      </div>

      {/* Cancel button */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="mt-4 text-sm text-slate-500 hover:text-slate-700"
        >
          {texts.cancel[language]}
        </button>
      )}
    </div>
  );
}
