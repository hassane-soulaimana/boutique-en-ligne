import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ConfirmationCommande() {
  return (
    <main className="min-h-screen bg-stone-50 py-24 px-6">
      <div className="max-w-2xl mx-auto bg-white p-12 rounded-sm shadow border border-stone-200 text-center">

        <CheckCircleIcon className="w-20 h-20 text-amber-600 mx-auto mb-8" />

        <h1 className="text-3xl font-semibold text-stone-900 mb-4">
          Merci pour votre commande !
        </h1>

        <p className="text-stone-600 text-lg mb-8 leading-relaxed">
          Votre commande a bien été enregistrée.  
          Vous recevrez un e-mail de confirmation avec tous les détails.
        </p>

        <div className="bg-stone-100 py-4 px-6 rounded-sm text-stone-700 text-sm mb-8">
          Numéro de commande : <span className="font-medium">#2025-00X-78</span>
        </div>

        <Link
          to="/"
          className="inline-block bg-stone-900 text-white px-8 py-3 rounded-sm text-lg font-medium hover:bg-amber-700 transition"
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
