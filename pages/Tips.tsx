import React, { useState } from 'react';
import { Coffee, Heart, CreditCard, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Tips: React.FC = () => {
    const { t } = useLanguage();
    const [amount, setAmount] = useState<number | ''>('');
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

    const presets = [5, 10, 20, 50];

    const handlePresetClick = (val: number) => {
        setSelectedPreset(val);
        setAmount(val);
    };

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setSelectedPreset(null);
        setAmount(isNaN(val) ? '' : val);
    };

    const handlePayment = () => {
        if (!amount || amount <= 0) return;
        alert(`Gracias por tu apoyo! Serías redirigido a una pasarela de pago para procesar $${amount}.`);
    };

    return (
        <div className="pt-32 pb-16 px-6 max-w-5xl mx-auto fade-in">
            <div className="text-center mb-16">
                <div className="flex justify-center mb-6 text-stone-800">
                    <Heart size={32} strokeWidth={1} />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl mb-4">{t('tips.title')}</h1>
                <p className="font-sans text-sm text-stone-500 leading-relaxed max-w-2xl mx-auto">
                    {t('tips.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Sección Tarjeta / Cafecito */}
                <div className="bg-white p-8 md:p-10 shadow-sm border border-stone-100 rounded-sm h-full">
                    <div className="flex items-center justify-center space-x-3 mb-8 text-stone-800">
                        <Coffee size={24} strokeWidth={1.5} />
                        <h3 className="font-serif text-2xl">{t('tips.coffeeTitle')}</h3>
                    </div>

                    {/* Presets */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {presets.map((val) => (
                            <button
                                key={val}
                                onClick={() => handlePresetClick(val)}
                                className={`py-3 border transition-all duration-300 flex flex-col items-center justify-center space-y-1 ${selectedPreset === val
                                    ? 'bg-stone-800 text-white border-stone-800'
                                    : 'border-stone-200 text-stone-600 hover:border-stone-800'
                                    }`}
                            >
                                <span className="font-serif text-lg">${val}</span>
                            </button>
                        ))}
                    </div>

                    {/* Custom Input */}
                    <div className="mb-8">
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">{t('tips.customAmount')}</label>
                        <div className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 font-serif text-xl text-stone-400">$</span>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                placeholder="0.00"
                                value={amount}
                                onChange={handleCustomChange}
                                className="w-full bg-transparent border-b border-stone-200 pl-6 py-2 font-serif text-2xl focus:outline-none focus:border-stone-800 text-stone-800 placeholder-stone-200 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Action */}
                    <div className="w-full relative z-0">
                        {amount && Number(amount) > 0 ? (
                            <PayPalScriptProvider options={{ "clientId": "AZ6CJIojpiu4YQKHoGsEMXams-0IN5eVSDe_pLblBnB5u8Hp07nVSS1ZyPvuX8wnAwIlVlBLQ-KbNqRx", components: "buttons", currency: "USD" }}>
                                <PayPalButtons
                                    style={{ layout: "vertical", shape: "rect", label: "pay" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: amount.toString(),
                                                    },
                                                },
                                            ],
                                            intent: "CAPTURE"
                                        });
                                    }}
                                    onApprove={async (data, actions) => {
                                        if (actions.order) {
                                            return actions.order.capture().then((details) => {
                                                const payeeName = details.payer?.name?.given_name || "Supporter";
                                                alert(`Transaction completed by ${payeeName}. Thanks for your support!`);
                                                setAmount('');
                                                setSelectedPreset(null);
                                            });
                                        }
                                        return Promise.resolve();
                                    }}
                                />
                            </PayPalScriptProvider>
                        ) : (
                            <button
                                disabled={true}
                                className="w-full py-4 flex items-center justify-center space-x-3 text-xs uppercase tracking-[0.2em] bg-stone-200 text-stone-400 cursor-not-allowed"
                            >
                                <CreditCard size={16} />
                                <span>{t('tips.donateBtn')}</span>
                            </button>
                        )}
                    </div>

                    <p className="text-center mt-6 text-[10px] text-stone-400 font-sans">
                        Pagos procesados de forma segura vía PayPal.
                    </p>
                </div>

                {/* Sección Yape */}
                <div className="bg-stone-900 text-white p-8 md:p-10 shadow-lg rounded-sm flex flex-col items-center text-center relative overflow-hidden h-full">
                    {/* Decorative Icon Background */}




                    <div className="flex flex-col items-center justify-center space-y-4 mb-8 relative z-10">
                        <div className="flex items-center space-x-6 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                            {/* Yape */}
                            <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center p-1 overflow-hidden transition-transform group-hover:scale-110 duration-300">
                                    <img
                                        src="https://images.seeklogo.com/logo-png/39/1/yape-app-logo-png_seeklogo-399697.png"
                                        alt="Yape"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-[10px] font-sans tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">Yape</span>
                            </div>

                            <div className="w-px h-10 bg-white/10"></div>

                            {/* Plin */}
                            <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2 overflow-hidden transition-transform group-hover:scale-110 duration-300">
                                    <img
                                        src="https://seeklogo.com/images/P/plin-logo-A69C63E9B4-seeklogo.com.png"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "https://images.seeklogo.com/logo-png/38/1/plin-logo-png_seeklogo-386806.png"
                                        }}
                                        alt="Plin"
                                        className="w-full h-full object-contain scale-125"
                                    />
                                </div>
                                <span className="text-[10px] font-sans tracking-widest text-white/70 uppercase group-hover:text-white transition-colors">Plin</span>
                            </div>
                        </div>
                    </div>

                    <p className="font-sans text-xs tracking-widest text-white/60 mb-8 uppercase relative z-10">
                        {t('tips.scanQr')}
                    </p>


                    <div className="bg-white p-4 rounded-xl mb-6 shadow-2xl relative z-10 transform transition-transform hover:scale-105 duration-500">
                        {/* 
                   NOTA PARA EL DESARROLLADOR: 
                   Reemplaza el 'data=...' en la URL de abajo con la URL real de tu Yape o tu número, 
                   o reemplaza todo el src="" con la ruta a tu imagen de QR real (ej: /images/yape-qr.png).
               */}
                        <img
                            src="/images/tips/QR_Yape_ChrisLS.webp"
                            alt="QR Yape"
                            className="w-48 h-48 md:w-56 md:h-56 object-contain"
                        />
                    </div>

                    <div className="space-y-1 relative z-10 mt-auto">
                        <p className="font-serif text-xl tracking-wide">Chris LS</p>
                        <p className="font-sans text-sm text-white/50 tracking-widest">+51 972 772 288</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 w-full relative z-10">
                        <p className="text-[10px] text-white/40 font-sans uppercase tracking-widest">
                            {t('tips.onlyPeru')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tips;