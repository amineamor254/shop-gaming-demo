import Hero from "@/components/Hero/page";
import Sections from "@/components/Sections/page";
import Configurator from "@/components/Configurator/page";
import Blog from "@/components/Blog/page";
import Offers from "@/components/Offers/page";
import Contact from "@/components/Contact/page";


export default function Home() {
  return (  
    <main>
      <Hero />
      <Sections />
      <Configurator />
      <Blog />
      <Offers />
      <Contact />
    </main>
  );
}
