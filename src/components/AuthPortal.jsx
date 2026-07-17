import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { INSTITUTIONS } from '../constants/institutions';
import { Mail, Lock, User, Landmark, UserPlus, LogIn, Fingerprint, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';
import FormField from './ui/FormField';
import StatusBanner from './ui/StatusBanner';

export default function AuthPortal({ onDismiss, defaultMode = 'signin' }) {
  const { signIn, signUp, user } = useAuth();
  const [mode, setMode] = useState(defaultMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedInst, setSelectedInst] = useState(INSTITUTIONS[0]);
  const [customInst, setCustomInst] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  React.useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  React.useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        setSuccessMsg('Signed in successfully.');
        setTimeout(() => onDismiss(), 1000);
      } else {
        const finalInst = selectedInst === 'Independent / Other' && customInst.trim()
          ? customInst.trim()
          : selectedInst;
        if (!finalInst) {
          setErrorMsg('Please choose an institution.');
          setLoading(false);
          return;
        }
        const res = await signUp(email, password, { fullName, institution: finalInst });
        if (isSupabaseConfigured && res && !res.session) {
          setSuccessMsg('Account created. Please check your email to confirm your account.');
        } else {
          setSuccessMsg('Account created. Welcome!');
          setTimeout(() => onDismiss(), 1000);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm text-primary">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden text-primary flex flex-col justify-between">
        <div className="bg-gray-950 p-6 text-white text-center space-y-2 relative">
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xs tracking-widest uppercase font-semibold"
          >
            ✕ Close
          </button>
          <Fingerprint className="w-8 h-8 mx-auto text-amber-500 stroke-[1.5]" />
          <h2 className="text-2xl font-semibold tracking-wide text-white">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
        </div>
        <div className="p-6 md:p-8 space-y-6 text-primary">
          {user ? (
            <div className="bg-[#FAF8F3] border border-border p-4 space-y-3 text-primary">
              <div className="flex justify-between items-center pb-2">
                <span className="text-[10px] font-bold text-gray-700 tracking-widest uppercase flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> You are successfully signed in
                </span>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && <StatusBanner type="error" text={errorMsg} />}
              {successMsg && <StatusBanner type="success" text={successMsg} />}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-primary">
                {mode === 'signup' && (
                  <div className="space-y-3">
                    <FormField
                      label="Full name"
                      name="fullName"
                      required
                      placeholder="e.g. Dr. Arthur Dent"
                      icon={User}
                      className="py-2 text-xs"
                      labelClassName="text-gray-700 uppercase tracking-widest text-[9px] font-bold block mb-1"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />

                    <FormField
                      label="Institution"
                      name="selectedInst"
                      type="select"
                      required
                      options={INSTITUTIONS}
                      icon={Landmark}
                      className="py-2 text-xs"
                      labelClassName="text-gray-700 uppercase tracking-widest text-[9px] font-bold block mb-1"
                      value={selectedInst}
                      onChange={(e) => setSelectedInst(e.target.value)}
                    />

                    {selectedInst === 'Independent / Other' && (
                      <FormField
                        name="customInst"
                        placeholder="Optionally enter your institution name..."
                        className="py-2 text-xs"
                        value={customInst}
                        onChange={(e) => setCustomInst(e.target.value)}
                      />
                    )}
                  </div>
                )}

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
                  {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>



              <div className="text-center text-[11px] text-gray-700 border-t border-gray-100 pt-2 flex items-center justify-between">
                <span>{mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}</span>
                <button
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-primary underline font-semibold flex items-center gap-0.5 hover:text-gray-700"
                >
                  {mode === 'signin' ? (
                    <><UserPlus className="w-3.5 h-3.5" /> Sign Up</>
                  ) : (
                    <><LogIn className="w-3.5 h-3.5" /> Sign In</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
