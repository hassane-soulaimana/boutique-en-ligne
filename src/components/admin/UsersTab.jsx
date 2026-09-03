export const UsersTab = ({ users, onDelete, onChangeRole, changingRoleId }) => (
  <section className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Utilisateurs</h2>
        <p className="text-sm text-slate-500 mt-1">Gérez les comptes clients et administrateurs.</p>
      </div>
      <span className="rounded-full border border-slate-200 px-4 py-1 text-sm text-slate-500">
        {users.length} membre{users.length > 1 ? 's' : ''}
      </span>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            {['Utilisateur', 'Email', 'Rôle', 'Inscription', 'Actions'].map((heading) => (
              <th key={heading} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user._id || user.id} className="hover:bg-slate-50/80 transition">
              <td className="px-5 py-4 font-medium text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">
                  {(user.name || user.firstName || user.email || '?')[0].toUpperCase()}
                </div>
                {user.name || user.firstName || 'Utilisateur'}
              </td>
              <td className="px-5 py-4 text-slate-500">{user.email}</td>
              <td className="px-5 py-4">
                <select
                  value={user.role || 'user'}
                  disabled={changingRoleId === (user._id || user.id)}
                  onChange={(e) => onChangeRole(user._id || user.id, e.target.value)}
                  className="px-2 py-1 rounded border border-slate-200 bg-white text-slate-700"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-5 py-4 text-sm text-slate-500">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : '—'}
              </td>
              <td className="px-5 py-3 text-sm">
                <button
                  onClick={() => onDelete(user)}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-100 px-3 py-1 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition"
                >
                  🗑️ Supprimer
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td className="px-6 py-8 text-center text-slate-400" colSpan={5}>
                Aucun utilisateur pour le moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
);
