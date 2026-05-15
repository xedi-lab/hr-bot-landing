import Nav from './components/Nav';
import Hero from './components/Hero';
import ProductPreview from './components/ProductPreview';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProductPreview />
        <HowItWorks />
        <Benefits />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
