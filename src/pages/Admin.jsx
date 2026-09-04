import { useCallback, useEffect, useState } from 'react';
import { animeApi } from '../services/animeApi';
import { Button } from '../components/admin/AdminUI';
import { LoginPage } from '../components/admin/LoginPage';
import { DashboardTab } from '../components/admin/DashboardTab';
import { ProductsTab } from '../components/admin/ProductsTab';
import { OrdersTab } from '../components/admin/OrdersTab';
import { UsersTab } from '../components/admin/UsersTab';
import { CollectionsTab } from '../components/admin/CollectionsTab';

export default function Admin() {
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

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast(''), 3000);
  }, []);

  const fetchAll = useCallback(async () => {
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
  }, [showToast]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAll();
    }
  }, [isLoggedIn, fetchAll]);

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

  const tabs = [
    {
      id: 'dashboard',
      label: '📊 Dashboard',
      render: () => (
        <DashboardTab
          products={datasets.products}
          orders={datasets.orders}
          users={datasets.users}
          collections={datasets.collections}
          onRefresh={fetchAll}
          loading={loading}
        />
      )
    },
    {
      id: 'products',
      label: '📦 Produits',
      render: () => (
        <ProductsTab
          products={datasets.products}
          universes={datasets.collections}
          categories={datasets.categories}
          onSave={handleSaveProduct}
          onDelete={handleDeleteProduct}
          loading={loading}
        />
      )
    },
    {
      id: 'orders',
      label: '🛒 Commandes',
      render: () => <OrdersTab orders={datasets.orders} onUpdateStatus={handleUpdateOrderStatus} />
    },
    {
      id: 'users',
      label: '👥 Utilisateurs',
      render: () => (
        <UsersTab
          users={datasets.users}
          onDelete={handleDeleteUser}
          onChangeRole={handleChangeUserRole}
          changingRoleId={changingRoleId}
        />
      )
    },
    {
      id: 'collections',
      label: '🎨 Collections',
      render: () => <CollectionsTab collections={datasets.collections} products={datasets.products} />
    }
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
