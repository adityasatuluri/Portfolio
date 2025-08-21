export default function StickyDemo() {
  return (
    <div className="bg-black text-white">
      {/* SKILLS Section */}
      <section className="flex px-10 py-20 gap-10">
        {/* Sticky Title */}
        <div className="w-1/3">
          <h2 className="text-8xl sticky top-20">SKILLS</h2>
        </div>

        {/* Content */}
        <div className="w-2/3 space-y-6">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>Skill card {i + 1}</p>
          ))}
        </div>
      </section>

      {/* TIMELINE Section */}
      <section className="flex px-10 py-20 gap-10">
        {/* Sticky Title */}
        <div className="w-1/3">
          <h2 className="text-8xl sticky top-20">TIMELINE</h2>
        </div>

        {/* Content */}
        <div className="w-2/3 space-y-6">
          {Array.from({ length: 25 }, (_, i) => (
            <p key={i}>Timeline item {i + 1}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
