import React from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import Logo from "../component/Logo";
import Footer from "../component/Footer"; // Import Footer


// --- Burung Effect (Tetap sama) ---
const BurungEffect = () => {
  const birds = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 3 + 2}rem`,
      animation: `fly ${
        Math.random() * 5 + 3
      }s ease-in-out infinite alternate ${Math.random() * -5}s`,
      opacity: Math.random() * 0.4 + 0.1,
    },
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {birds.map((bird) => (
        <span key={bird.id} className="absolute" style={bird.style}>
          🐦
        </span>
      ))}
    </div>
  );
};

export default function ResultPage() {
  const location = useLocation();
  const data = location.state?.data;

  if (!data) return <Navigate to="/" />;

  const renderResult = () => {
    switch (data.statusLulus) {
      // === KARTU LULUS (Gaya SNBT) ===
      case "lulus":
        return (
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto animate-fade-in-up">
            {/* Header Biru Khas SNBT */}
            <div className="bg-[#0099FF] p-6 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/30 mix-blend-overlay pattern-grid-lg"></div>{" "}
              {/* Efek Pattern opsional */}
              <h1 className="text-3xl md:text-4xl font-bold relative z-10 uppercase tracking-wider drop-shadow-md">
                SELAMAT! ANDA LULUS
              </h1>
              <p className="text-blue-100 relative z-10 mt-2 font-medium">
                Seleksi Oprek LabsSquad RDO 2025
              </p>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Kolom Kiri: Informasi Peserta */}
              <div className="flex-1 p-8 md:p-10 bg-blue-50 text-gray-800">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                        NIM
                    </label>
                    <p className="text-2xl font-bold">{data.nim}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                      Nama Lengkap
                    </label>
                    <p className="text-2xl font-bold">{data.namaLengkap}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                      Tanggal Lahir
                    </label>
                    <p className="text-xl font-semibold">{data.tanggalLahir}</p>
                  </div>
                  <div className="pt-6 border-t border-blue-200">
                    <label className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                      Diterima sebagai
                    </label>
                    <p className="text-3xl font-extrabold text-[#0099FF] mt-1">
                      Anggota LabsSquad RDO 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: QR Code & Info Tambahan */}
              <div className="w-full md:w-1/3 bg-blue-100/50 p-8 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-blue-200 text-center">
                <img src="/qr.jpg" />
                <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border text-gray-500 border-blue-200 w-full hover:bg-green-400 hover:text-white">
                  <a
                    className="text-xs"
                    href="https://chat.whatsapp.com/CKZ7VrRzXCy2CeIsceYvTx?mode=wwt"
                  >
                    GRUP WHATSAPP ANGGOTA LABSSQUAD RDO 2025
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      // === KARTU TIDAK LULUS (Gaya SNBT) ===
      case "tidak_lulus":
        return (
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto animate-fade-in-up grayscale-10">
            {/* Header Merah/Oranye */}
            <div className="bg-[#FF6B6B] p-6 text-white text-center relative overflow-hidden">
              <h1 className="text-3xl md:text-4xl font-bold relative z-10 uppercase tracking-wider drop-shadow-md">
                JANGAN PUTUS ASA
              </h1>
              <p className="text-red-100 relative z-10 mt-2 font-medium">
                Seleksi Oprek LabsSquad RDO 2025
              </p>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Informasi Peserta */}
              <div className="flex-1 p-8 md:p-10 bg-red-50 text-gray-800">
                <div className="space-y-6 opacity-80">
                  {" "}
                  {/* Sedikit transparan agar kesan 'kurang aktif' */}
                  <div>
                    <label className="text-sm text-red-600 font-bold uppercase tracking-wider">
                    NIM
                    </label>
                    <p className="text-2xl font-bold text-gray-700">
                      {data.nim}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-red-600 font-bold uppercase tracking-wider">
                      Nama Lengkap
                    </label>
                    <p className="text-2xl font-bold text-gray-700">
                      {data.namaLengkap}
                    </p>
                  </div>
                </div>

                {/* Pesan Penyemangat */}
                <div className="mt-10 p-6 bg-white rounded-xl border-l-4 border-[#FF6B6B] shadow-sm">
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">
                    <span className="font-bold text-[#FF6B6B]">MOHON MAAF</span>
                    , Anda dinyatakan belum lulus seleksi tahun ini.
                  </p>
                  <p className="text-gray-600 mt-4 italic">
                    "Tetap semangat! Kegagalan hari ini adalah pelajaran
                    berharga untuk kesuksesan di masa depan."
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "burung":
        // ... (Easter Egg Burung tetap sama, tidak perlu diubah layoutnya karena spesial)
        return (
          <div className="relative z-10 glass-card rounded-3xl p-10 text-center border-4 border-(--color-accent-pink) overflow-hidden max-w-2xl mx-auto">
            <BurungEffect />
            <h1 className="text-6xl md:text-8xl mb-6 animate-bounce filter drop-shadow-2xl">
              🐦
            </h1>
            <h2 className="text-3xl font-extrabold text-(--color-accent-pink) mb-4 drop-shadow-[0_0_10px_rgba(238,169,242,0.5)]">
              MODE BURUNG DIAKTIFKAN!
            </h2>
            <h3 className="text-2xl text-white font-bold mb-8 drop-shadow-md">
              {data.namaLengkap}
            </h3>
            <p className="text-xl text-white font-semibold drop-shadow-sm">
              Selamat terbang bebas!
            </p>
          </div>
        );

      default:
        return <div className="text-white">Data tidak valid.</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow flex flex-col items-center justify-center p-6 relative z-10">
        {/* Logo di atas (opsional, bisa dihapus jika ingin fokus penuh ke kartu) */}
        <div className="mb-8">
          <Logo className="h-16 opacity-90 drop-shadow-lg" />
        </div>

        <div className="w-full">{renderResult()}</div>

        <Link
          to="/"
          className="mt-10 px-8 py-3 rounded-full bg-black/50 hover:bg-black/70 text-white font-bold backdrop-blur-md transition-all hover:scale-105 flex items-center gap-3 border border-white/20 shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Login
        </Link>
      </div>
      <Footer />
    </div>
  );
}
