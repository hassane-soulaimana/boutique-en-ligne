import { useMemo, useState } from 'react';
import { Input, Select, TextArea, Button } from './AdminUI';

export const ProductsTab = ({ products, universes, categories, onSave, onDelete, loading }) => {
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
