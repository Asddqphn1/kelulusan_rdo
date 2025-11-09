import React, { useState, useEffect } from "react"; // Impor useEffect
import { useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import Footer from "../component/Footer";

// --- WAKTU PENGUMUMAN ---
// Berdasarkan "besok jam 3 sore" dari waktu server (Minggu, 9 Nov 2025)
// Ini adalah Senin, 10 November 2025, 15:00 WIB (GMT+7)
const ANNOUNCEMENT_TIME = new Date("2025-11-09T23:32:00+07:00").getTime();

// --- Komponen Countdown ---
const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const calculateRemaining = () => {
      const now = new Date().getTime();
      const difference = ANNOUNCEMENT_TIME - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Waktu habis, set null untuk memicu render ulang di parent
        setTimeRemaining(null);
        // Kita bisa juga paksa refresh, tapi biarkan parent yg handle
      }
    };

    // Jalankan sekali saat mount
    calculateRemaining();

    // Update tiap detik
    const timer = setInterval(calculateRemaining, 1000);

    // Cleanup interval saat komponen unmount
    return () => clearInterval(timer);
  }, []);

  // Format angka agar selalu 2 digit (misal: 09)
  const padZero = (num) => num.toString().padStart(2, "0");

  if (!timeRemaining) {
    return (
      <div className="glass-card rounded-3xl p-10 text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-4">Mempersiapkan...</h2>
        <div className="text-lg text-gray-200">Halaman akan dimuat ulang.</div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-8 md:p-10 text-center animate-fade-in-up">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
        Pengumuman Akan Dibuka Dalam:
      </h2>
      <div className="flex justify-center gap-3 md:gap-6 text-white">
        {/* Hari */}
        <div className="flex flex-col items-center justify-center bg-black/20 p-4 rounded-xl w-20 h-20 md:w-24 md:h-24 shadow-lg">
          <span className="text-3xl md:text-4xl font-extrabold">
            {padZero(timeRemaining.days)}
          </span>
          <span className="text-xs md:text-sm font-semibold opacity-80">
            HARI
          </span>
        </div>
        {/* Jam */}
        <div className="flex flex-col items-center justify-center bg-black/20 p-4 rounded-xl w-20 h-20 md:w-24 md:h-24 shadow-lg">
          <span className="text-3xl md:text-4xl font-extrabold">
            {padZero(timeRemaining.hours)}
          </span>
          <span className="text-xs md:text-sm font-semibold opacity-80">
            JAM
          </span>
        </div>
        {/* Menit */}
        <div className="flex flex-col items-center justify-center bg-black/20 p-4 rounded-xl w-20 h-20 md:w-24 md:h-24 shadow-lg">
          <span className="text-3xl md:text-4xl font-extrabold">
            {padZero(timeRemaining.minutes)}
          </span>
          <span className="text-xs md:text-sm font-semibold opacity-80">
            MENIT
          </span>
        </div>
        {/* Detik */}
        <div className="flex flex-col items-center justify-center bg-black/20 p-4 rounded-xl w-20 h-20 md:w-24 md:h-24 shadow-lg">
          <span className="text-3xl md:text-4xl font-extrabold text-(--color-accent-pink)">
            {padZero(timeRemaining.seconds)}
          </span>
          <span className="text-xs md:text-sm font-semibold opacity-80">
            DETIK
          </span>
        </div>
      </div>
      <p className="mt-5">Pengumuman akan dibuka Senin, 10 November 2025 Pukul 15.00 WIB</p>
    </div>
  );
};

// --- Komponen Form (Kode Anda sebelumnya) ---
const LoginForm = () => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formattedTanggalLahir = tanggalLahir
        ? tanggalLahir.split("-").reverse().join("/")
        : "";

      const response = await fetch("/datakelulusan.json");
      if (!response.ok) throw new Error("Gagal memuat data.");

      const data = await response.json();

      const standardizeName = (str) =>
        str.trim().toLowerCase().replace(/\s/g, "").replace(/\./g, "");

      const standardizedNamaInput = standardizeName(nama);

      const peserta = data.find(
        (p) =>
          standardizeName(p.namaLengkap) === standardizedNamaInput &&
          p.nim.trim() === nim.trim() &&
          p.tanggalLahir.trim() === formattedTanggalLahir
      );

      if (peserta) {
        navigate("/hasil", { state: { data: peserta } });
      } else {
        setError(
          "Data tidak ditemukan. Periksa kembali Nama, NIM, dan Tanggal Lahir Anda."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan sistem saat memuat data.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-black/30 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-pink)] focus:ring-1 focus:ring-[var(--color-accent-pink)] transition-all [color-scheme:dark]";

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-3xl p-8 space-y-6 animate-fade-in-up"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 ml-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className={inputClass}
          placeholder="Nama Lengkap sesuai pendaftaran"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 ml-1">
          NIM
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          className={inputClass}
          placeholder="Contoh: 1234567890"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2 ml-1">
          Tanggal Lahir
        </label>
        <input
          type={tanggalLahir ? "date" : "text"}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
          value={tanggalLahir}
          onChange={(e) => setTanggalLahir(e.target.value)}
          className={`${inputClass} cursor-pointer`}
          placeholder="DD/MM/YYYY"
          required
        />
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-sm font-medium text-center animate-pulse-slow">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        // PERBAIKAN SINTAKS TAILWIND:
        className="w-full py-4 px-6 bg-linear-to-r from-(--color-primary) to-(--color-secondary) hover:from-(--color-secondary) hover:to-(--color-primary) text-white font-bold text-lg rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Memeriksa...
          </span>
        ) : (
          "LIHAT HASIL SELEKSI"
        )}
      </button>
    </form>
  );
};

// --- Halaman Login Utama (Controller) ---
export default function LoginPage() {
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    // Cek status awal saat komponen dimuat
    const checkTime = () => {
      if (new Date().getTime() >= ANNOUNCEMENT_TIME) {
        setIsTimeUp(true);
      }
    };

    checkTime();

    // Set interval untuk mengecek jika countdown sudah selesai
    const interval = setInterval(() => {
      if (new Date().getTime() >= ANNOUNCEMENT_TIME) {
        setIsTimeUp(true);
        clearInterval(interval);
      }
    }, 1000); // Cek setiap detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in-down">
            <Logo className="h-32 mb-6" />
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              Pengumuman Oprek
            </h1>
            {/* PERBAIKAN SINTAKS TAILWIND: */}
            <p className="text-(--color-accent-pink) font-bold tracking-widest mt-2 drop-shadow-sm">
              LABSSQUAD RDO 2025
            </p>
          </div>

          {/* Tampilkan Countdown atau Form berdasarkan waktu */}
          {isTimeUp ? <LoginForm /> : <CountdownTimer />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
