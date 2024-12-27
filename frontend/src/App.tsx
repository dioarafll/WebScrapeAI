import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { FaVolumeUp, FaStopCircle } from 'react-icons/fa';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>(''); // Input URL
  const [scrapeResponse, setScrapeResponse] = useState<any>(null);
  const [scrapeLoading, setScrapeLoading] = useState<boolean>(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  const [summaryText, setSummaryText] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false); // Status untuk TTS (Text-to-Speech)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle Scrape Request
  const handleScrape = async () => {
    if (!url.trim()) return; // Validasi URL kosong

    setScrapeLoading(true);
    setScrapeError(null);
    setScrapeResponse(null);

    try {
      const response = await fetch(
        `http://localhost:8080/scrape?url=${encodeURIComponent(url)}`
      );

      const contentType = response.headers.get('Content-Type');

      // Cek jika respons tidak berhasil
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      // Validasi jika respons dalam format JSON
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setScrapeResponse(data); // Jika respons JSON, simpan langsung
      } else {
        // Jika bukan JSON, tampilkan sebagai teks
        const textData = await response.text();
        setScrapeResponse({ message: textData });
      }
    } catch (error: any) {
      // Tangani kesalahan
      setScrapeError(error.message || 'Terjadi kesalahan saat scrape');
    } finally {
      setScrapeLoading(false);
    }
  };

  // Fungsi untuk mengunduh file teks
  const handleDownload = () => {
    if (!scrapeResponse) return;

    const content =
      typeof scrapeResponse === 'string'
        ? scrapeResponse
        : JSON.stringify(scrapeResponse, null, 2);

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'scrape-result.txt';
    a.click();

    URL.revokeObjectURL(url);
  };

  // Handle Summary Request
  const handleSummary = async () => {
    if (!scrapeResponse) return;

    setSummaryLoading(true);
    setSummaryError(null);
    setSummaryText(null);

    try {
      const payload = {
        input:
          typeof scrapeResponse === 'string'
            ? scrapeResponse
            : JSON.stringify(scrapeResponse),
      };

      const response = await fetch('http://localhost:8080/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setSummaryText(data.summary_text || 'No summary available.');
      setIsModalOpen(true);
    } catch (error: any) {
      setSummaryError(error.message || 'Terjadi kesalahan saat summary');
    } finally {
      setSummaryLoading(false);
    }
  };

  // Fungsi Text-to-Speech
  const handleSpeak = () => {
    if (summaryText) {
      const utterance = new SpeechSynthesisUtterance(summaryText);
      utterance.lang = 'id-ID';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    // Cleanup saat komponen unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="relative overflow-auto bg-gray-100 dark:bg-neutral-800 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl lg:text-6xl transition-all duration-300">
            Scrape & Summarize Data
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-neutral-400 sm:text-xl">
            Masukkan URL, lakukan scrape, dan dapatkan summary hasilnya.
          </p>
        </div>

        {/* Input Section */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white dark:bg-neutral-700 rounded-lg shadow-lg p-6 w-full sm:w-3/4 lg:w-1/2 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Masukkan URL
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Masukkan URL untuk scrape..."
                className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleScrape}
                disabled={scrapeLoading}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {scrapeLoading ? 'Loading...' : 'Ambil Data Scrape'}
              </button>
            </div>

            {/* Error Message */}
            {scrapeError && (
              <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-md">
                {scrapeError}
              </div>
            )}

            <button
              onClick={handleSummary}
              disabled={summaryLoading}
              className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {summaryLoading ? 'Loading...' : 'Lakukan Summary'}
            </button>

            {/* Scrape Result */}
            {scrapeResponse && (
              <div className="mt-6 p-3 bg-gray-100 dark:bg-neutral-600 text-gray-700 dark:text-white rounded-md overflow-auto max-h-64">
                <strong>Hasil Scrape:</strong>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(scrapeResponse, null, 2)}
                </pre>
              </div>
            )}

            {scrapeResponse && !scrapeLoading && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleDownload}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Unduh Hasil Scrape
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-6">
          <a
            href="#"
            className="inline-flex items-center gap-x-2 bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-md shadow-md hover:bg-gray-800 transition duration-300 transform hover:scale-105"
          >
            Visit GitHub
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Summary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-neutral-700 p-6 rounded-md shadow-md w-11/12 max-w-md overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Summary Result
            </h2>
            {summaryLoading ? (
              <p>Loading...</p>
            ) : summaryText ? (
              <Typewriter
                options={{
                  strings: summaryText,
                  autoStart: true,
                  delay: 10, // Kecepatan efek mengetik
                }}
              />
            ) : (
              <p>No summary available.</p>
            )}
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Close
              </button>

              {!isSpeaking ? (
                <button
                  onClick={handleSpeak}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  <FaVolumeUp className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleStopSpeaking}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  <FaStopCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
