import { Categories, Container, SortPopup, Title } from "@/components/shared";

export default function Home() {
  return (
   <>
      <Container className="mt-10">
         <Title text="All pizzas" size="lg" className="font-extrabold" />

         <Categories />
         <SortPopup />
      </Container>
   </>
  );
}
