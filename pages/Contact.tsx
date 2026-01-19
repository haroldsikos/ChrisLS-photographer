import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    fetch("https://formsubmit.co/ajax/c6fd77c56b5b47a775da9ea244219897", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        message: formData.message,
        _subject: `Nuevo mensaje de ${formData.name} - Chris LS Web`,
        _cc: formData.email
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', country: '', message: '' });
      })
      .catch(error => {
        console.log(error);
        setStatus('error');
        alert('Ocurrió un error al enviar. Por favor intenta nuevamente.');
      });
  };

  return (
    <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto fade-in">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">{t('contact.title')}</h1>
        <p className="font-sans text-sm text-stone-500 leading-relaxed max-w-xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-stone-100 p-8 text-center border border-stone-200">
          <h3 className="font-serif text-2xl mb-2">{t('contact.form.successTitle')}</h3>
          <p className="font-sans text-stone-600">{t('contact.form.successText')}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-stone-500 hover:border-stone-500"
          >
            {t('contact.form.sendAnother')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-stone-500">{t('contact.form.name')}</label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-stone-500">{t('contact.form.email')}</label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:col-span-2">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-stone-500">{t('contact.form.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="contact_number"
                  className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="block text-xs uppercase tracking-widest text-stone-500">{t('contact.form.country')}</label>
                <div className="relative">
                  <select
                    id="country"
                    name="user_country"
                    className="w-full bg-transparent border-b border-stone-300 py-3 appearance-none focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg pr-8 cursor-pointer"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="" disabled className="text-stone-300">Seleccionar</option>
                    <option value="PE">Perú (+51)</option>
                    <option value="US">USA (+1)</option>
                    <option value="MX">México (+52)</option>
                    <option value="ES">España (+34)</option>
                    <option value="AR">Argentina (+54)</option>
                    <option value="CL">Chile (+56)</option>
                    <option value="CO">Colombia (+57)</option>
                    <option value="OTHER">Otro / Other</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-stone-500">{t('contact.form.message')}</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-800 transition-colors font-serif text-lg resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <div className="text-center pt-8">
            <button
              type="submit"
              className="bg-stone-900 text-white px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-stone-700 transition-colors duration-300"
            >
              {t('contact.form.submit')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;