import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
     <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Image with Zoom Animation */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-zoom"
        style={{ backgroundImage: "url('/bg/bg1.jpg')" }}
      ></div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
          Welcome to <span className="text-purple-400">AutoMatrix</span>
        </h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-10">
          Manage your <span className="text-blue-400 font-semibold">Cars</span>,{" "}
          <span className="text-purple-300 font-semibold">Customers</span>, and{" "}
          <span className="text-pink-400 font-semibold">Services</span> in one
          smart dashboard. Experience a{" "}
          <span className="italic">3D glassmorphic</span> design with futuristic
          vibes that makes managing your business seamless and fun.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <Link href="/login">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/40 hover:scale-105 transition-transform">
              🚀 Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/40 hover:scale-105 transition-transform">
              ✨ Register
            </button>
          </Link>
        </div>
      </div>

      {/* 3D Car Showcase with Tilt Effect */}
      <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {[
          {
            name: 'Tesla Model S',
            img: '/cars/tesla.jpg',
            desc: 'Electric power meets futuristic luxury.',
          },
          {
            name: 'BMW i8',
            img: '/cars/BMW.jpg',
            desc: 'Hybrid sports car with cutting-edge design.',
          },
          {
            name: 'Audi R8',
            img: '/cars/Audi.jpg',
            desc: 'Unmatched performance and iconic style.',
          },
        ].map((car, index) => (
          <div
            key={index}
            className="p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 
                       shadow-xl shadow-black/40 transform-gpu transition-transform 
                       duration-500 hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105"
          >
            {/* Car Image */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={car.img}
                alt={car.name}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
                priority
              />
            </div>
            <h3 className="text-xl font-bold text-white mt-4 text-center">
              {car.name}
            </h3>
            <p className="text-gray-300 mt-2 text-center">{car.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}


