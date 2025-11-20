import { products, collections } from '../../data/mocks';
import ProductCard from '../../components/ProductCard';
import { notFound } from 'next/navigation';

export default async function CollectionPage({ params }: { params: Promise<{ univers: string }> }) {
  const { univers } = await params;
  
  const collection = collections.find(c => c.id === univers);
  
  if (!collection) {
    notFound();
  }

  const collectionProducts = products.filter(p => p.univers === univers);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{collection.name}</h1>
        <p className="text-xl text-gray-600">{collection.description}</p>
      </div>
      
      {collectionProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">Aucun produit trouvé dans cette collection pour le moment.</p>
      )}
    </div>
  );
}
