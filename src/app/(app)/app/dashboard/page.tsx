import { ContentBlock } from "@/components/ContentBlock";
import { Heading } from "@/components/Heading";
import { NumberOfPets } from "@/components/NumberOfPets";
import { PetDetails } from "@/components/PetDetails";
import { PetsList } from "@/components/PetsList";
import { SearchForm } from "@/components/SearchForm";

const DashboardPage = () => (
  <main>
    <div className="flex items-center justify-between text-white py-8">
      <section>
        <Heading>
          Pet <span className="font-semibold">Soft</span>
        </Heading>
        <p className="text-lg opacity-80">Manage your pet daycare with ease</p>
      </section>
      <NumberOfPets />
    </div>
    <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
      <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
        <SearchForm />
      </div>
      <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
        <ContentBlock>
          <PetsList />
        </ContentBlock>
      </div>
      <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
        <ContentBlock>
          <PetDetails />
        </ContentBlock>
      </div>
    </div>
  </main>
);

export default DashboardPage;
