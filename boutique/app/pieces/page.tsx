import { products } from '../data/mocks';
import ProductCard from '../components/ProductCard';

export default function PiecesPage() {
  const pieces = products.filter(p => p.category === 'pieces');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Nos Pièces d'Échecs Manga</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pieces.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
