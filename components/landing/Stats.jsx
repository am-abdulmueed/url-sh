"use client";

export default function Stats() {
  // Static demo stats
  const users = 1000;
  const links = 70000;
  const clicks = 120000;

  return (
    <section className="mb-20 py-16 rounded-sm bg-secondary/30 md:bg-transparent mt-10 px-6 md:px-20 lg:px-32 text-center sm:w-fit w-full sm:mx-auto">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        {/* Registered Users */}
        <div className="grid !gap-0">
          <div className="flex items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-semibold">{users.toLocaleString()}</h3>
            <span className="text-2xl md:text-3xl font-semibold">+</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">registered users</p>
        </div>

        {/* Shortened Links */}
        <div className="grid !gap-0">
          <div className="flex items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-semibold">{links.toLocaleString()}</h3>
            <span className="text-2xl md:text-3xl font-semibold">+</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">links shortened</p>
        </div>

        {/* Link Clicks */}
        <div className="grid !gap-0">
          <div className="flex items-center justify-center">
            <h3 className="text-3xl md:text-4xl font-semibold">{clicks.toLocaleString()}</h3>
            <span className="text-2xl md:text-3xl font-semibold">+</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">link clicks</p>
        </div>
      </div>
    </section>
  );
}
