import { products } from '../data/mocks';
import ProductCard from '../components/ProductCard';

export default function AccessoiresPage() {
  const accessoires = products.filter(p => p.category === 'accessoires');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Accessoires & Goodies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessoires.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
