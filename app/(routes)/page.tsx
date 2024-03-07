import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import ServiceFeatures from "@/components/service-features";
import HomeBanner from "@/components/ui/home-banner";

export const revalidate = 0;

const HomePage = async () => {
  // const products = await getProducts({ isFeatured: true });
  // const billboard = await getBillboard("09226af9-b617-4544-a79d-1defce7ffb28");

  return (
    <div>
      {/* <Billboard data={billboard} /> */}
      <HomeBanner />
      <div className="flex flex-col gap-y-8 px-6 sm:px-8 lg:px-10">
        {/* <ProductList title="Featured Products" items={products} /> */}
      </div>
      <ServiceFeatures />
    </div>
  );
};

export default HomePage;
