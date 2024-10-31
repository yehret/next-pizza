import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
   <>
      <Container className="mt-10">
         <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
         <div className="flex gap-[80px]">

            {/* Filter */}
            <div className="w-[250px]">
               <Filters />
            </div>

            {/* ProductList */}
            <div className="flex-1">
               <div className="flex flex-col gap-16">
                  <ProductsGroupList title="Pizzas" categoryId={1} items={[
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 2, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 3, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 4, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 5, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 6, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'}
                  ]}/>

                  <ProductsGroupList title="Combo" categoryId={2} items={[
                     { id: 7, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 8, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 9, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 10, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 11, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 12, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                  ]}/>
               </div>
            </div>
         </div>
      </Container>
   </>
  );
}
