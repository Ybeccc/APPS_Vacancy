import styles from './style';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import CardDeal from './components/CardDeal';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import CTA from './components/CTA';
import Footer from './components/Footer';

const Asisten = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar/>
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero/>
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats/>
        <CardDeal/>
        <Testimonials/>
        <Clients/>
        <CTA/>
        <Footer/>
      </div>
    </div>

  </div>
)

export default Asisten