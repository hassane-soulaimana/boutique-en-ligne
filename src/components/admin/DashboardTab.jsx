import { useMemo } from 'react';
import { Card, Button } from './AdminUI';

export const DashboardTab = ({ products, orders, users, collections, onRefresh, loading }) => {
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
          <p className="text-sm text-slate-500 mt-1">Vue d'ensemble de l'activité de la boutique.</p>
        </div>
        <Button onClick={onRefresh} disabled={loading} className="flex items-center gap-2">
          {loading ? '⏳ Mise à jour...' : '🔄 Actualiser'}
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
