import React, { useState } from 'react';
import { AuthUser } from '../../types';
import { X, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onSignOut: () => void;
}

/**
 * SettingsModal Component
 * 
 * Configured per user requirement:
 * "under settings keep only sign out option only"
 */
export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSignOut,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleSignOutClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onSignOut();
    onClose();
  };

  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name.slice(0, 2) || 'US').toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in select-none">
      <div
        className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Settings</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Account management</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content: Active User Card & Sign Out Action */}
        <div className="p-6 space-y-6">
          {/* Active User Information Card */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center text-sm font-bold shadow-2xs shrink-0">
                {currentUser ? getInitials(currentUser.name) : 'NR'}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {currentUser?.name || 'Niharika Reddi'}
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {currentUser?.email || 'niharikareddi1308@gmail.com'}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>Authenticated via {currentUser?.provider === 'google' ? 'Google' : 'Email'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out Action Section */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSignOutClick}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                isConfirming
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/60'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>{isConfirming ? 'Click Again to Confirm Sign Out' : 'Sign Out'}</span>
            </button>

            {isConfirming && (
              <button
                onClick={() => setIsConfirming(false)}
                className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 py-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <p className="text-center text-[11px] text-neutral-400 dark:text-neutral-500">
              Signing out will end your current session and require re-authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
