import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import Footer from "../component/Footer";

export default function LoginPage() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(""); // Akan menyimpan format YYYY-MM-DD dari input date
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

      const peserta = data.find(
        (p) =>
          p.namaLengkap.trim().toLowerCase() === nama.trim().toLowerCase() &&
          p.nim.trim() === nim.trim() &&
          // Bandingkan dengan tanggal yang sudah diformat
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

  // Menambahkan [color-scheme:dark] agar ikon kalender bawaan browser menyesuaikan dengan background gelap
  const inputClass =
    "w-full px-4 py-3 bg-black/30 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-pink)] focus:ring-1 focus:ring-[var(--color-accent-pink)] transition-all [color-scheme:dark]";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in-down">
            <Logo className="h-32 mb-6" />
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              Pengumuman Oprek
            </h1>
            <p className="text-[var(--color-accent-pink)] font-bold tracking-widest mt-2 drop-shadow-sm">
              LABSSQUAD RDO 2025
            </p>
          </div>

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
              {/* Menggunakan type="date" untuk date picker native */}
              <input
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                className={`${inputClass} cursor-pointer`}
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
              className="w-full py-4 px-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] text-white font-bold text-lg rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
