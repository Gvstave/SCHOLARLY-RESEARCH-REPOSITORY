import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

/**
 * SignInForm sub-component for AuthPortal.
 */
export default function SignInForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loading,
}) {
  return (
    <>
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        icon={Mail}
        className="py-2 text-xs"
        labelClassName="text-gray-700 uppercase tracking-widest text-[9px] font-bold block mb-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        required
        placeholder="••••••••"
        icon={Lock}
        className="py-2 text-xs"
        labelClassName="text-gray-700 uppercase tracking-widest text-[9px] font-bold block mb-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500 hover:text-primary transition flex items-center justify-center p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        }
      />

      <Button
        type="submit"
        disabled={loading}
        fullWidth
        variant="primary"
        className="text-xs py-3 border-gray-950 hover:shadow"
      >
        {loading ? 'Please wait...' : 'Sign In'}
      </Button>
    </>
  );
}
