export const CollectionsTab = ({ collections, products }) => (
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
