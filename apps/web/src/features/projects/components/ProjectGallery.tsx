import React from "react";

type ProjectGalleryProps = {
  gallery: string[];
};

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ gallery }) => {
  if (!gallery.length) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {gallery.map((image, index) => (
        <div
          key={image}
          className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 ${
            index === 0 ? "md:col-span-2 md:row-span-2" : ""
          }`}
        >
          <img
            src={image}
            alt="Project showcase"
            className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#05060c]/70 via-transparent to-transparent"></div>
        </div>
      ))}
    </section>
  );
};

export default ProjectGallery;
