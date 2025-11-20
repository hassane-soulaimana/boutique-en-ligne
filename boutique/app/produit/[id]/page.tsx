import { products } from '../../data/mocks';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0 md:w-1/2 bg-gray-200 h-64 md:h-auto flex items-center justify-center">
           {/* Placeholder for image */}
           <span className="text-gray-500 text-xl">Image: {product.name}</span>
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
              {product.category} - {product.univers}
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">
              {product.name}
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              {product.description}
            </p>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-gray-900">{product.price} €</span>
              <span className="text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full text-sm">
                En stock
              </span>
            </div>
            
            <button className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded hover:bg-yellow-600 transition duration-300 shadow-md">
              Ajouter au panier
            </button>
            
            <div className="mt-4 text-center">
               <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm underline">
                 Retour à l'accueil
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
