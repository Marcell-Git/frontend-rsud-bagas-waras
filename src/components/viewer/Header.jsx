import sketchRsud from "../../assets/sketch_rsud_blue.png";

const Header = ({ subtitle, title, description }) => {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 bg-primary-blue bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${sketchRsud})` }}
    >
      <div className="absolute inset-0 bg-dark-blue/80 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-primary-blue/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <span className="inline-block py-1 px-3 md:px-4 rounded-full bg-white/20 text-blue-100 text-xs md:text-sm font-semibold tracking-wider uppercase mb-4 md:mb-6 backdrop-blur-sm border border-white/30">
          {subtitle}
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-primary font-bold text-white mb-4 md:mb-6 drop-shadow-md">
          {title}
        </h1>
        <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto font-medium px-2">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Header;