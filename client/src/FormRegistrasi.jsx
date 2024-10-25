import styles from './style';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { useState, useEffect } from "react";
import axios from "axios";

const FormRegistrasi = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        studentId: "",
        studyProgram: "",
        classOf: "",
        courseName: ""
    });
    
    const [courses, setCourses] = useState([]); // Store courses from the API
    const [loading, setLoading] = useState(true); // Loading state
    
    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get("http://localhost:3000/courses"); // Adjust URL as needed
            console.log("API Response:", response.data); // Verify the response structure
            setCourses(response.data.data); // Access the 'data' array inside the response
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert("Registration Successful!");
    };
    
    if (loading) {
        return <div>Loading courses...</div>; // Show a loading message while fetching
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
                <label htmlFor="name" className={styles.label}>Nama Lengkap</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                />
                </div>

                {/* Email Input */}
                <div>
                <label htmlFor="email" className={styles.label}>Nomor Induk Mahasiswa</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                />
                </div>

                {/* Student ID Input */}
                <div>
                <label htmlFor="studentId" className={styles.label}>Email UNTAR</label>
                <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your student ID"
                />
                </div>

                {/* Study Program Input */}
                <div>
                <label htmlFor="studyProgram" className={styles.label}>Program Studi</label>
                <input
                    type="text"
                    id="studyProgram"
                    name="studyProgram"
                    value={formData.studyProgram}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your study program"
                />
                </div>

                {/* Class of Input */}
                <div>
                <label htmlFor="classOf" className={styles.label}>Angkatan</label>
                <input
                    type="number"
                    id="classOf"
                    name="classOf"
                    value={formData.classOf}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your class year (e.g., 2022)"
                />
                </div>

                {/* Course Name Dropdown */}
                <div className="mb-4">
                    <label htmlFor="courseName" className={`${styles.label} block text-sm font-medium text-gray-700`}>
                        Mata Kuliah
                    </label>
                    <select
                        id="courseName"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Pilih Mata Kuliah</option>
                        {Array.isArray(courses) && courses.length > 0 ? (
                        courses.map((course) => (
                            <option key={course.crsId} value={course.crsCourseName}>
                            {course.crsCourseName}
                            </option>
                        ))
                        ) : (
                        <option disabled>Tidak ada mata kuliah tersedia</option>
                        )}
                    </select>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="button"
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
