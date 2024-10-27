import { Container, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
   <>
      <Container className="mt-10">
         <Title text="All pizzas" size="lg" className="font-extrabold" />

         <TopBar />
      </Container>
   </>
  );
}
