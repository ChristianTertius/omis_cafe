import { motion } from 'framer-motion';
import React, { useState } from 'react';

const styles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default function FindUsSection() {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            if (type === 'email') {
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
                setAlertMessage('Email copied to clipboard!');
            } else if (type === 'phone') {
                setCopiedPhone(true);
                setTimeout(() => setCopiedPhone(false), 2000);
                setAlertMessage('Phone number copied to clipboard!');
            }

            // Show alert
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            setAlertMessage('Failed to copy!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        });
    };

    return (
        <section className="bg-[#3d5a4f] text-white py-16 px-4 md:px-8 relative min-h-screen" id="findus">
            {/* Toast Alert */}
            {showAlert && (
                <div className="fixed top-8 right-8 z-50 animate-[slideIn_0.3s_ease-out]">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3">
                        <span className="text-xl">✓</span>
                        <span className="font-medium">{alertMessage}</span>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight">
                    Find Us
                </motion.h2>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="flex flex-col gap-6">
                        {/* Contact Us Card */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 hover:bg-white/15 transition-colors duration-300">
                            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
                                    📞
                                </span>
                                Contact Us
                            </h3>

                            <div className="space-y-5 pl-11">
                                {/* Address */}
                                <div className="group">
                                    <div className="text-sm text-white/70 mb-1">Address</div>
                                    <div className="text-base md:text-lg font-medium">
                                        Jl. Kebon Jeruk, West Jakarta
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="group">
                                    <div className="text-sm text-white/70 mb-1">Phone</div>
                                    <div className="flex items-center gap-2">
                                        <a href="tel:0896888888321"
                                            className="text-base md:text-lg font-medium hover:text-white/80 transition-colors">
                                            0896888888321
                                        </a>
                                        <button
                                            onClick={() => copyToClipboard('0896888888321', 'phone')}
                                            className={`px-2 py-1 rounded text-xs transition-all duration-300 ${copiedPhone
                                                ? 'bg-green-500/50 scale-110'
                                                : 'bg-white/20 hover:bg-white/30'
                                                }`}
                                            title="Copy phone number"
                                        >
                                            {copiedPhone ? '✓' : '📋'}
                                        </button>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="group">
                                    <div className="text-sm text-white/70 mb-1">Email</div>
                                    <div className="flex items-center gap-2">
                                        <a href="mailto:omis.cafe@gmail.com"
                                            className="text-base md:text-lg font-medium hover:text-white/80 transition-colors break-all">
                                            omis.cafe@gmail.com
                                        </a>
                                        <button
                                            onClick={() => copyToClipboard('omis.cafe@gmail.com', 'email')}
                                            className={`px-2 py-1 rounded text-xs transition-all duration-300 ${copiedEmail
                                                ? 'bg-green-500/50 scale-110'
                                                : 'bg-white/20 hover:bg-white/30'
                                                }`}
                                            title="Copy email"
                                        >
                                            {copiedEmail ? '✓' : '📋'}
                                        </button>
                                    </div>
                                </div>

                                {/* Instagram */}
                                <div className="group">
                                    <div className="text-sm text-white/70 mb-1">Instagram</div>
                                    <a href="https://instagram.com/omis_cafe"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base md:text-lg font-medium hover:text-white/80 transition-colors inline-flex items-center gap-2">
                                        @omis_cafe
                                        <span className="text-xs">🔗</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours Card */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 hover:bg-white/15 transition-colors duration-300">
                            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
                                    🕒
                                </span>
                                Working Hours
                            </h3>

                            <div className="space-y-5 pl-11">
                                {/* Monday - Friday */}
                                <div className="group">
                                    <div className="text-sm text-white/70 mb-1">Monday - Friday</div>
                                    <div className="text-base md:text-lg font-medium">10:00 - 22:00</div>
                                </div>

                                {/* Saturday */}
                                <div className="group">
                                    <div className="text-sm text-white/70 mb-1">Saturday</div>
                                    <div className="text-base md:text-lg font-medium">13:00 - 22:00</div>
                                </div>

                                {/* Sunday */}
                                <div className="group">
                                    <div className="text-sm text-white/70 mb-1">Sunday</div>
                                    <div className="text-base md:text-lg font-medium text-red-300">OFF</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="h-[400px] lg:h-full lg:min-h-[600px] bg-[#2a4038] rounded-xl shadow-2xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666!2d106.8456!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNTAnNDQuMiJF!5e0!3m2!1sen!2sid!4v1234567890"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Omis Cafe Location"
                        />
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
