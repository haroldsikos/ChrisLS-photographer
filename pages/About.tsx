import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-6 max-w-5xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-[3/4] bg-stone-200 overflow-hidden relative">
            <img
              src="/images/me/Christian_me.webp"
              alt="Chris LS Portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="font-serif text-4xl mb-2 text-stone-900 dark:text-stone-100">Sobre Mí</h1>
          <p className="font-sans text-xs tracking-widest text-stone-500 dark:text-stone-400 uppercase mb-6">Fotógrafo | Videógrafo | Creador</p>

          <div className="font-serif text-lg text-stone-700 dark:text-stone-300 space-y-6 leading-relaxed">
            <p>
              Hola, soy Chris. Un entusiasta de todo lo creativo.
            </p>
            <p>
              Originalmente inspirado por los paisajes naturales, he pasado los últimos años viajando en busca de los entornos más únicos y salvajes para fotografiar. Desde costas escarpadas hasta profundos interiores forestales.
            </p>
            <p>
              Mi trabajo trata de capturar la atmósfera y el sentimiento. Me inclino hacia un enfoque narrativo, utilizando luz natural, texturas ricas y una paleta cálida y terrosa para crear imágenes que se sienten inmersivas y cinematográficas.
            </p>
            <p>
              Ya sea que esté fotografiando una carretera de montaña sinuosa o la suave luz de la mañana a través de los helechos de la selva, mi objetivo es evocar el estado de ánimo de un momento de la manera más honesta y poderosa posible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;