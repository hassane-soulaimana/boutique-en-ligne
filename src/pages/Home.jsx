import Hero from "../components/heroSection/Hero";
import NewProducts from "../components/products/NewProducts";
import ChessPieces from "../components/products/ChessPieces";
import Univers from "../components/univers/Univers";
import Why from "../components/why/Why";

export default function Home() {
  return (
    <>
      <Hero />
      <NewProducts />
      <ChessPieces />
      <Univers />
      <Why />
    </>
  );
}
