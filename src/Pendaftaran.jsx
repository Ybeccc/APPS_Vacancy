import styles from './style';
import { stats } from './constants';
import Button from './components/Button';

import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

import { jumbotron2 } from './assets';

const Pendaftaran = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar/>
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        {/* =====JUMBOTRON SECTION===== */}
        <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
          <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
                    <span className="text-gradient">Pendaftaran</span> {" "}
                </h1>
            </div>

            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Daftar sekarang untuk menjadi asisten praktikum atau asisten mahasiswa. 
            Ikuti langkah-langkahnya dan kirimkan aplikasi Anda segera untuk mendapatkan pengalaman berharga dan meningkatkan perjalanan akademis Anda.
            </p>

          </div>

          <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={jumbotron2} alt="billing" className="w-[100%] h-[100%] realtive z-[5]" />
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          </div>
        </section>
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>

        {/* =====TAHAPAN PENDAFTARAN SECTION===== */}
        <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
          {stats.map((stat) => (
              <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-3`}>
                  <h4 className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white">{stat.value}</h4>
                  <p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3">{stat.title}</p>
              </div>
          ))}
        </section>

        {/* =====PERSYARATAN A.PRAKTIKUM SECTION===== */}
        <section id="requirements" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
          <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

          <div className="w-full flex flex-col items-start sm:mb-16 mb-6 relative z-[1]">
            <h1 className={styles.heading2}>
              Persyaratan Asisten Praktikum
            </h1>
            <div className="w-full mt-6">
              <p className={`${styles.paragraph} text-left max-w-[450px]`}>
                Everything you need to accept card payments and grow your business
                anywhere on the planet.
              </p>
            </div>
            <Button styles="mt-10" />
          </div>
        </section>
        {/* =====PERSYARATAN A.MAHASISWA SECTION===== */}
        <Testimonials/>
        <Footer/>
      </div>
    </div>

  </div>
)

export default Pendaftaran