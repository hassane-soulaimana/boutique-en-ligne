import { useEffect, useMemo, useState } from 'react';
import { animeApi } from '../services/animeApi';

// ---- UI helpers -----------------------------------------------------------
const CARD_TONES = {
  blue: {
    wrap: 'bg-indigo-50 border border-indigo-100 shadow-sm',
    label: 'text-indigo-500',
    value: 'text-indigo-700'
  },
  green: {
    wrap: 'bg-emerald-50 border border-emerald-100 shadow-sm',
    label: 'text-emerald-500',
    value: 'text-emerald-700'
  },
  purple: {
    wrap: 'bg-violet-50 border border-violet-100 shadow-sm',
    label: 'text-violet-500',
    value: 'text-violet-700'
  },
  amber: {
    wrap: 'bg-amber-50 border border-amber-100 shadow-sm',
    label: 'text-amber-500',
    value: 'text-amber-700'
  },
  orange: {
    wrap: 'bg-orange-50 border border-orange-100 shadow-sm',
    label: 'text-orange-500',
    value: 'text-orange-700'
  },
  teal: {
    wrap: 'bg-teal-50 border border-teal-100 shadow-sm',
    label: 'text-teal-500',
    value: 'text-teal-700'
  },
  pink: {
    wrap: 'bg-rose-50 border border-rose-100 shadow-sm',
    label: 'text-rose-500',
    value: 'text-rose-700'
  },
  neutral: {
    wrap: 'bg-slate-50 border border-slate-100 shadow-sm',
    label: 'text-slate-500',
    value: 'text-slate-700'
  }
};

const Card = ({ tone, label, value }) => {
  const styles = CARD_TONES[tone] || CARD_TONES.neutral;

  return (
    <div className={`${styles.wrap} rounded-xl p-4`}>
      <p className={`${styles.label} text-sm font-medium`}>{label}</p>
      <p className={`${styles.value} text-3xl font-bold`}>{value}</p>
    </div>
  );
};

const Label = ({ children }) => (
  <label className="block text-sm font-medium text-slate-600 mb-1">{children}</label>
);

const Input = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-stone-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <Label>{label}</Label>
    <select
      {...props}
      className="w-full px-4 py-2 border border-stone-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    >
      {children}
    </select>
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <textarea
      {...props}
      className="w-full px-4 py-2 border border-stone-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

const Button = ({ variant = 'primary', className = '', ...props }) => {
  const palette = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm',
    danger: 'bg-rose-500 hover:bg-rose-400 text-white shadow-sm'
  };

  return (
    <button
      {...props}
      className={`${palette[variant]} font-medium px-4 py-2 rounded-xl transition disabled:opacity-50 ${className}`}
    />
  );
};

const StatusBadge = ({ status }) => {
  const tones = {
    delivered: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    shipped: 'bg-sky-50 text-sky-600 ring-sky-100',
    processing: 'bg-sky-50 text-sky-600 ring-sky-100',
    admin: 'bg-rose-50 text-rose-600 ring-rose-100',
    moderator: 'bg-violet-50 text-violet-600 ring-violet-100',
    cancelled: 'bg-rose-50 text-rose-600 ring-rose-100'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${tones[status] || 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
      {status}
    </span>
  );
};

// ---- Auth ----------------------------------------------------------------
const LoginPage = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/90 p-10 shadow-2xl backdrop-blur">
        <div className="text-center mb-8 space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
            🔐 Accès sécurisé
          </span>
          <h1 className="text-3xl font-semibold text-slate-900">Espace d’administration</h1>
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

          <Button type="submit" className="w-full py-3 text-base">
            Se connecter
          </Button>
        </form>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-left">
          <p className="font-medium text-slate-700 mb-2">🔑 Identifiants démo</p>
          <p className="text-slate-500">Email&nbsp;: {ADMIN_EMAIL}</p>
          <p className="text-slate-500">Mot de passe&nbsp;: {ADMIN_PASSWORD}</p>
        </div>
      </div>
    </div>
  );
};

// ---- Tabs ----------------------------------------------------------------
const DashboardTab = ({ products, orders, users, collections, onRefresh, loading }) => {
  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + (order.total || 0), 0),
    [orders]
  );

  const pendingOrders = useMemo(
    () => orders.filter((order) => ['pending', undefined, null].includes(order.status)).length,
    [orders]
  );

  const deliveredOrders = useMemo(
    () => orders.filter((order) => order.status === 'delivered').length,
    [orders]
  );

  const cards = useMemo(
    () => [
      { tone: 'blue', label: 'Produits', value: products.length },
      { tone: 'green', label: 'Commandes', value: orders.length },
      { tone: 'purple', label: 'Utilisateurs', value: users.length },
      { tone: 'amber', label: 'Revenus', value: `${totalRevenue.toFixed(2)}€` }
    ],
    [orders.length, products.length, totalRevenue, users.length]
  );

  const secondary = useMemo(
    () => [
      { tone: 'orange', label: 'Commandes en attente', value: pendingOrders },
      { tone: 'teal', label: 'Commandes livrées', value: deliveredOrders },
      { tone: 'pink', label: 'Collections', value: collections.length }
    ],
    [collections.length, deliveredOrders, pendingOrders]
  );

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Tableau de bord</h2>
          <p className="text-sm text-slate-500 mt-1">Vue d’ensemble de l’activité de la boutique.</p>
        </div>
        <Button onClick={onRefresh} disabled={loading} className="flex items-center gap-2">
          {loading ? '⏳ Mise à jour...' : '🔄 Actualiser' }
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secondary.map((card) => (
          <Card key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
};

const ProductsTab = ({ products, universes, categories, onSave, onDelete, loading }) => {
  const defaultForm = useMemo(
    () => ({
      name: '',
      price: '',
      image: '',
      universe: '',
      category: '',
      description: '',
      stock: '10',
      featured: false
    }),
    []
  );

  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (editing === null) {
      setForm(defaultForm);
    }
  }, [defaultForm, editing]);

  const updateForm = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10)
    };

    if (editing) {
      if (!window.confirm('Confirmer la modification du produit ?')) {
        return;
      }
    }

    await onSave(payload, editing);
    setForm(defaultForm);
    setEditing(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || product.nom || '',
      price: String(product.price ?? product.prix ?? ''),
      image: product.image || '',
      // Le backend renvoie universe/category comme un nom (string) ; on retrouve l'id correspondant pour préremplir le select.
      universe: universes.find((u) => u.name === product.universe)?._id || '',
      category: categories.find((c) => c.name === product.category)?._id || '',
      description: product.description || '',
      stock: String(product.stock ?? 10),
      featured: !!product.featured
    });
    setEditing(product);
  };

  const cancelEdit = () => {
    setForm(defaultForm);
    setEditing(null);
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">
            {editing ? 'Modifier un produit' : 'Gestion des produits'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Ajoutez, mettez à jour ou supprimez les articles de votre catalogue.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg backdrop-blur grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Input label="Nom" value={form.name} onChange={updateForm('name')} required />
        <Input label="Prix (€)" type="number" step="0.01" value={form.price} onChange={updateForm('price')} required />
        <Input label="Image (URL)" value={form.image} onChange={updateForm('image')} required />
        <Select label="Univers" value={form.universe} onChange={updateForm('universe')} required>
          <option value="">Choisir...</option>
          {universes.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </Select>
        <Select label="Catégorie" value={form.category} onChange={updateForm('category')} required>
          <option value="">Choisir...</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </Select>
        <Input label="Stock" type="number" value={form.stock} onChange={updateForm('stock')} />
        <label className="flex items-center gap-2 text-sm font-medium text-slate-600 self-end pb-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))}
          />
          Mettre en avant (section "Nouveautés" de l'accueil)
        </label>
        <TextArea label="Description" rows={3} value={form.description} onChange={updateForm('description')} required />

        <div className="md:col-span-2 flex gap-3">
          <Button type="submit" disabled={loading}>
            {editing ? 'Modifier' : 'Ajouter'}
          </Button>
          {editing && (
            <Button type="button" variant="secondary" onClick={cancelEdit}>
              Annuler
            </Button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {['Produit', 'Prix', 'Univers', 'Catégorie', 'Actions'].map((heading) => (
                <th key={heading} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product._id || product.id || product.nom} className="hover:bg-slate-50/70 transition">
                <td className="px-5 py-4 font-medium text-slate-900 flex items-center gap-3">
                  {product.image?.startsWith('http') ? (
                    <img src={product.image} alt="" className="w-10 h-10 object-cover rounded" />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                  {product.name || product.nom}
                  {product.featured && <span title="Mis en avant">⭐</span>}
                </td>
                <td className="px-5 py-4 text-indigo-600 font-semibold">{product.price ?? product.prix}€</td>
                <td className="px-5 py-4 text-slate-500">{product.universe || '-'}</td>
                <td className="px-5 py-4 text-slate-500">{product.category || '-'}</td>
                <td className="px-5 py-3 flex gap-3 text-sm">
                  <button onClick={() => handleEdit(product)} className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500">
                    ✏️ Modifier
                  </button>
                  <button onClick={() => onDelete(product)} className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-400">
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td className="px-6 py-8 text-center text-slate-400" colSpan={5}>
                  Aucun produit disponible pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const OrdersTab = ({ orders, onUpdateStatus }) => (
  <section className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Commandes</h2>
        <p className="text-sm text-slate-500 mt-1">Suivez le statut des commandes clients en temps réel.</p>
      </div>
      <span className="rounded-full border border-slate-200 px-4 py-1 text-sm text-slate-500">
        {orders.length} commande{orders.length > 1 ? 's' : ''}
      </span>
    </div>

    {orders.length === 0 && (
      <p className="text-center py-16 text-slate-400">Aucune commande pour le moment.</p>
    )}

    <div className="space-y-5">
      {orders.map((order) => (
        <article
          key={order._id || order.id}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition hover:shadow-xl"
        >
          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
            <div>
              <p className="font-semibold text-slate-900">
                Commande #{order.orderNumber || order._id?.slice(-8) || '—'}
              </p>
              <p className="text-sm text-slate-500">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'Date inconnue'}
              </p>
            </div>

            <Select
              label="Statut"
              value={order.status || 'pending'}
              onChange={(event) => onUpdateStatus(order._id || order.id, event.target.value)}
            >
              <option value="pending">⏳ En attente</option>
              <option value="processing">📦 En préparation</option>
              <option value="shipped">🚚 Expédiée</option>
              <option value="delivered">✅ Livrée</option>
              <option value="cancelled">❌ Annulée</option>
            </Select>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 mb-4">
              <p className="text-sm font-semibold text-slate-700 mb-3">🧾 Détails des articles</p>
              {order.items.map((item) => (
                <div
                  key={item._id || item.product?.id || item.name}
                  className="flex justify-between text-sm py-2 border-b border-slate-100 last:border-b-0"
                >
                  <span className="text-slate-600">
                    {item.product?.name || item.nom || item.name || 'Produit'}
                    <span className="text-slate-400"> ×{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-slate-700">
                    {((item.product?.price || item.prix || item.price || 0) * item.quantity).toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-semibold text-indigo-600">
              {(order.total || 0).toFixed(2)}€
            </span>
          </div>
        </article>
      ))}
    </div>
  </section>
);


const UsersTab = ({ users, onDelete, onChangeRole, changingRoleId }) => (
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
                  onChange={e => onChangeRole(user._id || user.id, e.target.value)}
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

const CollectionsTab = ({ collections, products }) => (
  <section className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">Collections</h2>
        <p className="text-sm text-slate-500 mt-1">Une vue rapide des univers proposés sur la boutique.</p>
      </div>
      <span className="rounded-full border border-slate-200 px-4 py-1 text-sm text-slate-500">
        {collections.length} collection{collections.length > 1 ? 's' : ''}
      </span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {collections.map((collection) => {
        const name = collection.name || collection.nom || collection;
        const count = products.filter((product) =>
          (product.universe || '').toLowerCase() === (name || '').toLowerCase()
        ).length;

        return (
          <article
            key={collection._id || name}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="font-semibold text-slate-900 text-lg">{name}</h3>
            <p className="mt-1 text-sm text-slate-500">{count} produit{count > 1 ? 's' : ''}</p>
            {collection.description && (
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">{collection.description}</p>
            )}
          </article>
        );
      })}

      {collections.length === 0 && (
        <p className="text-center py-16 text-slate-400 col-span-full">Aucune collection trouvée.</p>
      )}
    </div>
  </section>
);

// ---- Main ----------------------------------------------------------------
export default function Admin() {
  // TOUS LES HOOKS EN HAUT DU COMPOSANT
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [datasets, setDatasets] = useState({ products: [], orders: [], users: [], collections: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [changingRoleId, setChangingRoleId] = useState(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.role === 'admin') {
            setAdminUser(user);
            setIsLoggedIn(true);
          } else {
            const profile = await animeApi.getMe();
            if (profile && profile.role === 'admin') {
              setAdminUser(profile);
              setIsLoggedIn(true);
            }
          }
        } catch (error) {
          console.error('Erreur vérification auth admin:', error);
        }
      }
      setCheckingAuth(false);
    };
    checkAdminAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAll();
    }
  }, [isLoggedIn]);

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [products, orders, users, collections, categories] = await Promise.all([
        animeApi.getProducts(),
        animeApi.getAllOrders(),
        animeApi.getAllUsers(),
        animeApi.getCollections(),
        animeApi.getCategories()
      ]);

      setDatasets({
        products: products || [],
        orders: orders || [],
        users: users || [],
        collections: collections || [],
        categories: categories || []
      });
    } catch (error) {
      console.error('Erreur de chargement des données :', error);
      showToast('❌ Impossible de charger les données');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await animeApi.login({ email, password });
      
      // Récupérer l'utilisateur depuis la réponse ou le localStorage
      let user = response?.data?.user || response?.user;
      if (!user) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          user = JSON.parse(storedUser);
        }
      }
      
      // Si pas d'user dans la réponse, récupérer le profil
      if (!user) {
        user = await animeApi.getMe();
      }
      
      // Vérifier si l'utilisateur est admin
      if (user && user.role === 'admin') {
        setAdminUser(user);
        setIsLoggedIn(true);
        showToast(`✅ Bienvenue ${user.name || user.firstName || 'Admin'} !`);
      } else {
        // Pas admin - déconnecter
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoginError('Accès refusé. Vous devez avoir un compte administrateur.');
      }
    } catch (error) {
      console.error('Erreur login admin:', error);
      setLoginError(error.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setAdminUser(null);
    showToast('👋 Déconnexion réussie');
  };

  const handleSaveProduct = async (payload, editing) => {
    setLoading(true);
    // Validation côté front
    if (!payload.name || !payload.price || !payload.image || !payload.universe || !payload.category || !payload.description) {
      showToast('❌ Tous les champs sont obligatoires');
      setLoading(false);
      return;
    }
    if (isNaN(payload.price) || payload.price <= 0) {
      showToast('❌ Le prix doit être un nombre positif');
      setLoading(false);
      return;
    }
    if (isNaN(payload.stock) || payload.stock < 0) {
      showToast('❌ Le stock doit être un nombre positif');
      setLoading(false);
      return;
    }
    try {
      if (editing) {
        await animeApi.updateProduct(editing._id || editing.id, payload);
        showToast('✅ Produit modifié');
      } else {
        await animeApi.createProduct(payload);
        showToast('✅ Produit ajouté');
      }
      fetchAll();
    } catch (error) {
      showToast(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer "${product.nom || product.name}" ? Cette action est irréversible.`)) {
      showToast('Suppression annulée');
      return;
    }
    try {
      await animeApi.deleteProduct(product._id || product.id);
      showToast('✅ Produit supprimé');
      fetchAll();
    } catch (error) {
      showToast(`❌ Erreur: ${error.message}`);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    if (status === 'cancelled') {
      if (!window.confirm('Voulez-vous vraiment annuler cette commande ? Cette action est irréversible.')) {
        showToast('Annulation de commande annulée');
        return;
      }
    }
    try {
      await animeApi.updateOrderStatus(orderId, status);
      showToast(status === 'cancelled' ? '✅ Commande annulée' : '✅ Statut mis à jour');
      fetchAll();
    } catch (error) {
      showToast(`❌ Erreur: ${error.message}`);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Supprimer l'utilisateur "${user.name || user.email}" ?`)) {
      return;
    }

    try {
      await animeApi.deleteUser(user._id || user.id);
      showToast('✅ Utilisateur supprimé');
      fetchAll();
    } catch (error) {
      showToast(`❌ Erreur: ${error.message}`);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onSubmit={handleLogin} error={loginError} loading={loginLoading} />;
  }


  const handleChangeUserRole = async (userId, newRole) => {
    setChangingRoleId(userId);
    try {
      const result = await animeApi.updateUserRole(userId, newRole);
      if (result.success) {
        showToast('✅ Rôle mis à jour');
        fetchAll();
      } else {
        showToast(`❌ Erreur: ${result.message}`);
      }
    } catch (error) {
      showToast(`❌ Erreur: ${error.message}`);
    } finally {
      setChangingRoleId(null);
    }
  };

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', render: () => (
      <DashboardTab
        products={datasets.products}
        orders={datasets.orders}
        users={datasets.users}
        collections={datasets.collections}
        onRefresh={fetchAll}
        loading={loading}
      />
    ) },
    { id: 'products', label: '📦 Produits', render: () => (
      <ProductsTab
        products={datasets.products}
        universes={datasets.collections}
        categories={datasets.categories}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
        loading={loading}
      />
    ) },
    { id: 'orders', label: '🛒 Commandes', render: () => (
      <OrdersTab orders={datasets.orders} onUpdateStatus={handleUpdateOrderStatus} />
    ) },
    { id: 'users', label: '👥 Utilisateurs', render: () => (
      <UsersTab
        users={datasets.users}
        onDelete={handleDeleteUser}
        onChangeRole={handleChangeUserRole}
        changingRoleId={changingRoleId}
      />
    ) },
    { id: 'collections', label: '🎨 Collections', render: () => (
      <CollectionsTab collections={datasets.collections} products={datasets.products} />
    ) }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
              <span className="grid h-10 w-10 place-content-center rounded-xl bg-white/10 text-2xl">♟️</span>
              Console Anime Chess
            </h1>
            <p className="text-sm text-white/70 mt-1">Surveillez vos ventes et orchestrez votre catalogue depuis un espace unique.</p>
          </div>
          <div className="flex items-center gap-4">
            {adminUser && (
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {(adminUser.name || adminUser.firstName || adminUser.email || 'A')[0].toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-medium">{adminUser.name || adminUser.firstName || 'Admin'}</p>
                  <p className="text-white/60 text-xs">{adminUser.email}</p>
                </div>
              </div>
            )}
            <Button variant="danger" onClick={handleLogout} className="px-5 py-2.5">
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {toast && (
        <div className="fixed top-20 right-4 z-50 rounded-xl border border-slate-900/70 bg-slate-900 px-6 py-4 text-sm font-medium text-white shadow-xl">
          {toast}
        </div>
      )}

      <main className="max-w-7xl mx-auto p-6">
        <nav className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/80 text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="bg-white rounded-xl shadow-sm p-6">
          {tabs.find((tab) => tab.id === activeTab)?.render()}
        </section>
      </main>
    </div>
  );
}
