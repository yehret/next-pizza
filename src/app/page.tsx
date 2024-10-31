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
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                  ]}/>

                  <ProductsGroupList title="Breakfast" categoryId={1} items={[
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                     { id: 1, name: 'Cheeseburger pizza', items: [{ price: 20}], imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'},
                  ]}/>
               </div>
            </div>
         </div>
      </Container>
   </>
  );
}
