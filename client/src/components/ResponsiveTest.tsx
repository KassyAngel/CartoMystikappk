export default function ResponsiveTest() {
  return (
    <div className="min-h-screen bg-purple-900 text-white p-4">
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-yellow-400">
          Tarot de Marseille
        </h1>
        <p className="text-center mt-2 text-sm sm:text-base">
          Choisissez 3 cartes pour votre tirage passé-présent-futur
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="w-20 h-32 sm:w-24 sm:h-36 md:w-28 md:h-40 bg-yellow-100 rounded-xl"
            >
              <span className="text-center block text-black pt-12">
                Carte {num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
