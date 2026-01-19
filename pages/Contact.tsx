import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto fade-in">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Contacto</h1>
        <p className="font-sans text-sm text-stone-500 leading-relaxed max-w-xl mx-auto">
          Disponible en todo el mundo. Cuéntame tu historia y creemos algo juntos.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-stone-100 p-8 text-center border border-stone-200">
            <h3 className="font-serif text-2xl mb-2">¡Mensaje Enviado!</h3>
            <p className="font-sans text-stone-600">Gracias por contactarme. Te responderé lo antes posible.</p>
            <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-stone-500 hover:border-stone-500"
            >
                Enviar otro mensaje
            </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-stone-500">Nombre</label>
                    <input 
                        type="text" 
                        id="name"
                        required
                        className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-stone-500">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        required
                        className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-stone-500">Mensaje</label>
                <textarea 
                    id="message"
                    required
                    rows={6}
                    className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
            </div>

            <div className="text-center pt-8">
                <button 
                    type="submit"
                    className="bg-stone-900 text-white px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-stone-700 transition-colors duration-300"
                >
                    Enviar
                </button>
            </div>
        </form>
      )}
    </div>
  );
};

export default Contact;