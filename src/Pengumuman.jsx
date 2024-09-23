import styles from './style';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Business from './components/Business';
import Billing from './components/Billing';
import Footer from './components/Footer';

const Pengumuman = () => (
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
        <Business/>
        <Billing/>
        <Footer/>
      </div>
    </div>

  </div>
)

export default Pengumuman