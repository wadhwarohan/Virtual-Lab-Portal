const LoginLeftSide = () => {
    return (
        <div className="hidden md:flex w-1/2 bg-[#1e1b4b] relative overflow-hidden border-r border-slate-700">

            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.8); }
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 0.6; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes beam {
                    0% { transform: translateX(-300%) rotate(45deg); }
                    100% { transform: translateX(300%) rotate(45deg); }
                }
            `}</style>

            {/* SVG background shapes */}
            <svg className="absolute inset-0 w-full h-full">
                <circle cx="50%" cy="50%" r="300" fill="none" stroke="rgba(165,155,255,0.07)" strokeWidth="0.5"/>
                <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(165,155,255,0.05)" strokeWidth="0.5"/>
            </svg>

            {/* Twinkling stars */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${Math.random() * 3 + 2}px`,
                        height: `${Math.random() * 3 + 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `twinkle ${Math.random() * 2 + 1.5}s ${Math.random() * 4}s infinite ease-in-out`,
                    }}
                />
            ))}

            {/* Pulsing rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-indigo-400/40"
                        style={{
                            width: '200px', height: '200px',
                            top: '-100px', left: '-100px',
                            animation: `pulse-ring 3s ${i * 1}s infinite ease-out`,
                        }}
                    />
                ))}
            </div>

            {/* Light beam sweep */}
            <div
                className="absolute top-0 left-0 w-16 h-full bg-white/5 skew-x-12"
                style={{ animation: 'beam 5s 1s infinite ease-in-out' }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-50 w-full h-full">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                    Virtual Lab IITR <br /> Portal
                </h1>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN3qA53WfqlEJwgP4IrvFOpgWqdnw35TaSxQ&s"
                    alt="Virtual Lab IITR"
                    className="w-50 h-50 rounded-full mt-6 object-contain bg-white p-2.5"
                />
            </div>
        </div>
    );
};

export default LoginLeftSide;