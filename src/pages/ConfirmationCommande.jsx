import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function ConfirmationCommande() {
  const [orderInfo, setOrderInfo] = useState({
    orderNumber: "",
    total: 0,
    email: "",
  });

  useEffect(() => {
    // Récupérer les infos de la dernière commande
    const lastOrder = sessionStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrderInfo(JSON.parse(lastOrder));
      // Nettoyer après lecture
      sessionStorage.removeItem("lastOrder");
    }
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 py-24 px-6">
      <div className="max-w-2xl mx-auto bg-white p-12 rounded-sm shadow border border-stone-200 text-center">

        <CheckCircleIcon className="w-20 h-20 text-amber-600 mx-auto mb-8" />

        <h1 className="text-3xl font-semibold text-stone-900 mb-4">
          Merci pour votre commande !
        </h1>

        <p className="text-stone-600 text-lg mb-8 leading-relaxed">
          Votre commande a bien été enregistrée.
          {orderInfo.email && (
            <>
              <br />
              Un e-mail de confirmation sera envoyé à <strong>{orderInfo.email}</strong>.
            </>
          )}
        </p>

        <div className="bg-stone-100 py-4 px-6 rounded-sm text-stone-700 text-sm mb-4">
          Numéro de commande : <span className="font-medium">#{orderInfo.orderNumber || "En cours de génération"}</span>
        </div>

        {orderInfo.total > 0 && (
          <div className="bg-amber-50 py-4 px-6 rounded-sm text-amber-800 text-lg font-semibold mb-8">
            Total : {orderInfo.total.toFixed(2)} €
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-stone-900 text-white px-8 py-3 rounded-sm text-lg font-medium hover:bg-amber-700 transition"
          >
            Retour à l'accueil
          </Link>
          
          <Link
            to="/collections"
            className="inline-block bg-stone-100 text-stone-900 px-8 py-3 rounded-sm text-lg font-medium hover:bg-stone-200 transition"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    </main>
  );
}
