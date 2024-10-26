import styles from './style';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const FormRegistrasi = () => {
    const [formData, setFormData] = useState({
        aplName: "",
        aplNim: "",
        aplEmail: "",
        aplProdi: "",
        aplAkt: "",
        aplCrsId: "",
    });
    
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // File states
    const [aplSuratLamaran, setAplSuratLamaran] = useState(null);
    const [aplCv, setAplCv] = useState(null);
    const [aplKhs, setAplKhs] = useState(null);

    // Navigate
    const navigate = useNavigate();

    // Validate aplNim with regex (only numbers)
    const validateNim = (nim) => /^[0-9]*$/.test(nim);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/courses");
                setCourses(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@stu\.untar\.ac\.id$/;
        return emailRegex.test(email);
    };

    const handleFileChange = (e, setter) => {
        const file = e.target.files[0];

        // Validate file size (max 1 MB)
        if (file && file.size > 1024 * 1024) {
            alert("File size must be less than or equal to 1 MB.");
            e.target.value = ""; // Reset the file input
            return;
        }
        setter(file); // Store the valid file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email validation
        if (!validateEmail(formData.aplEmail)) {
            alert("Masukkan email UNTAR yang valid email@stu.untar.ac.id.");
            return;
        }

        const data = new FormData();
        data.append("aplName", formData.aplName);
        data.append("aplNim", formData.aplNim);
        data.append("aplEmail", formData.aplEmail);
        data.append("aplProdi", formData.aplProdi);
        data.append("aplAkt", formData.aplAkt);
        data.append("aplCrsId", formData.aplCrsId);

        // Append files to FormData
        if (aplSuratLamaran) data.append("aplSuratLamaran", aplSuratLamaran);
        if (aplCv) data.append("aplCv", aplCv);
        if (aplKhs) data.append("aplKhs", aplKhs);

        // Log the FormData content
        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post('http://localhost:3000/applicant', data);
    
            // Log the entire response for debugging
            console.log('Full Response:', response);
            console.log('Response Status:', response.status);

            if (response.status === 200) {
                console.log('Navigating to /informasi');
                navigate('/informasi'); // Redirect to /informasi
                alert('Registrasi Berhasil!');
            } else {
                console.error('Unexpected response:', response);
                alert('Terjadi kesalahan, silahkan coba lagi.');
            }
        } catch (error) {
            // Handle the error, including the status if available
            if (error.response) {
                console.error('Error Response:', error.response);
                console.error('Error Status:', error.response.status);
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error submitting form:', error);
                alert('Terjadi kesalahan, silahkan coba lagi.');
            }
        }
        
    };

    if (loading) {
        return <div>Loading courses...</div>;
    }

  return (
    <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar/>
            </div>
        </div>

        <div className="max-w-4xl mx-auto bg-black-gradient p-12 rounded-xl shadow-lg mt-10">
            <h2 className="font-poppins font-semibold xs:text-[34px] text-[30px] text-center text-white w-full mb-10">
                <span className="text-gradient">Form Registrasi</span><br />
                Asisten Praktikum dan Asisten Mahasiswa
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                <label htmlFor="aplName" className={styles.label}>Nama Lengkap</label>
                <input
                    type="text"
                    id="aplName"
                    name="aplName"
                    value={formData.aplName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan Nama Lengkap"
                />
                </div>

                {/* Email Input */}
                <div>
                <label htmlFor="aplNim" className={styles.label}>Nomor Induk Mahasiswa</label>
                <input
                    type="text"
                    id="aplNim"
                    name="aplNim"
                    value={formData.aplNim}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukan Nomor Induk Mahasiswa"
                />
                </div>

                {/* Student ID Input */}
                <div>
                <label htmlFor="aplEmail" className={styles.label}>Email UNTAR</label>
                <input
                    type="email"
                    id="aplEmail"
                    name="aplEmail"
                    value={formData.aplEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan Email UNTAR"
                />
                </div>

                {/* Study Program Dropdown */}
                <div>
                    <label htmlFor="aplProdi" className={styles.label}>
                        Program Studi
                    </label>
                    <select
                        id="aplProdi"
                        name="aplProdi"
                        value={formData.aplProdi}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>
                        Pilih Program Studi
                        </option>
                        <option value="Sistem Informasi">Sistem Informasi</option>
                        <option value="Teknik Informatika">Teknik Informatika</option>
                    </select>
                </div>

                {/* Class of Input */}
                <div>
                <label htmlFor="aplAkt" className={styles.label}>Angkatan</label>
                <input
                    type="number"
                    id="aplAkt"
                    name="aplAkt"
                    value={formData.aplAkt}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan tahun angkatan (e.g., 22)"
                />
                </div>

                {/* Course Name Dropdown */}
                <div className="mb-4">
                    <label htmlFor="aplCrsId" className={styles.label}>
                        Mata Kuliah
                    </label>
                    <select
                        id="aplCrsId"
                        name="aplCrsId"
                        value={formData.aplCrsId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Pilih Mata Kuliah</option>
                        {Array.isArray(courses) && courses.length > 0 ? (
                        courses.map((course) => (
                            <option key={course.crsId} value={course.crsId}>
                            {course.crsCourseName}
                            </option>
                        ))
                        ) : (
                        <option disabled>Tidak ada mata kuliah tersedia</option>
                        )}
                    </select>
                </div>

                {/* Upload Surat Lamaran PDF */}
                <div>
                    <label className={styles.label}>
                        Upload Surat Lamaran
                    </label>
                    <input type="file" name="aplSuratLamaran" onChange={(e) => handleFileChange(e, setAplSuratLamaran)} />
                </div>

                {/* Upload CV PDF */}
                <div>
                    <label className={styles.label}>
                        Upload CV
                    </label>
                    <input type="file" name="aplCv" onChange={(e) => handleFileChange(e, setAplCv)} />
                </div>

                {/* Upload KHS PDF */}
                <div>
                    <label className={styles.label}>
                        Upload KHS
                    </label>
                    <input type="file" name="aplKhs" onChange={(e) => handleFileChange(e, setAplKhs)} />
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles} mt-10`}>
                        Daftar
                    </button>
                </div>
            </form>
        </div>
        <Footer/>
    </div>
  );
};

export default FormRegistrasi;