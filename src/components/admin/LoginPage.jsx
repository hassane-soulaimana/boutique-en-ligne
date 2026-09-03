import { useState } from 'react';
import { Input, Button } from './AdminUI';

export const LoginPage = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/90 p-10 shadow-2xl backdrop-blur">
        <div className="text-center mb-8 space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
            🔐 Accès sécurisé
          </span>
          <h1 className="text-3xl font-semibold text-slate-900">Espace d'administration</h1>
          <p className="text-slate-500">Merci de vous identifier pour gérer Anime Chess.</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(email, password);
          }}
        >
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@animechess.com"
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" disabled={loading} className="w-full py-3 text-base">
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
      </div>
    </div>
  );
};
