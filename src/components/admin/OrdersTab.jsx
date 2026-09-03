import { Select } from './AdminUI';

export const OrdersTab = ({ orders, onUpdateStatus }) => (
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
