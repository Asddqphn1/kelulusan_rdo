import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import Footer from "../component/Footer"; // Import Footer

export default function LoginPage() {
  // ... (State dan fungsi handleSubmit SAMA PERSIS seperti sebelumnya, tidak perlu diubah)
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
      const response = await fetch("/datakelulusan.json");
      if (!response.ok) throw new Error("Gagal memuat data.");
      const data = await response.json();
      const peserta = data.find(
        (p) =>
          p.namaLengkap.trim().toLowerCase() === nama.trim().toLowerCase() &&
          p.nim.trim() === nim.trim() &&
          p.tanggalLahir.trim() === tanggalLahir.trim()
      );
      if (peserta) navigate("/hasil", { state: { data: peserta } });
      else
        setError(
          "Data tidak ditemukan. Periksa kembali Nama, NIM, dan Tanggal Lahir Anda."
        );
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-black/30 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-pink)] focus:ring-1 focus:ring-[var(--color-accent-pink)] transition-all";

  return (
    // Gunakan flex-col dan min-h-screen agar footer di bawah
    <div className="min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in-down">
            <Logo className="h-32 mb-6" />
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              Pengumuman Oprek
            </h1>
            <p className="text-(--color-accent-pink) font-bold tracking-widest mt-2 drop-shadow-sm">
              LABSSQUAD RDO 2025
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-8 space-y-6 animate-fade-in-up"
          >
            {/* ... (Isi form input Nama, NIM, Tanggal Lahir SAMA seperti sebelumnya) ... */}
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
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className={inputClass}
                placeholder="NIM"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2 ml-1">
                Tanggal Lahir (dd/mm/yyyy)
              </label>
              <input
                type="text"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                className={inputClass}
                placeholder="DD/MM/YYYY"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-linear-to-r from-(--color-primary) to-(--color-secondary) hover:from-(--color-secondary) hover:to-(--color-primary) text-white font-bold text-lg rounded-xl shadow-lg transition-all disabled:opacity-70"
            >
              {isLoading ? "Memeriksa..." : "LIHAT HASIL SELEKSI"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
