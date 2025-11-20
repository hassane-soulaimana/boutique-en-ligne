import Link from 'next/link';
import { Product } from '../data/mocks';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {/* Placeholder for image */}
        <span className="text-gray-500">Image: {product.name}</span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">{product.price} €</span>
          <Link 
            href={`/produit/${product.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
