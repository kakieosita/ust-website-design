import leader1 from "@/assets/leader-1.png";
import leader2 from "@/assets/leader-2.png";
import leader3 from "@/assets/leader-3.png";
import leader4 from "@/assets/leader-4.png";

const leaders = [
  {
    name: "Dr. Chima Okoro",
    role: "Founder & CEO",
    image: leader1,
    bio: "Visionary leader with 15+ years in ed-tech and software engineering.",
  },
  {
    name: "Aminat Yusuf",
    role: "Chief Technology Officer",
    image: leader2,
    bio: "Ex-Google engineer passionate about bridging the digital divide in Africa.",
  },
  {
    name: "Babatunde Williams",
    role: "Chief Operating Officer",
    image: leader3,
    bio: "Expert in scaling operations and building sustainable education hubs.",
  },
  {
    name: "Ngozi Adebayo",
    role: "Head of Programs",
    image: leader4,
    bio: "Dedicated to curriculum excellence and student success across the continent.",
  },
];

const LeadershipSection = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Leadership</p>
        <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4">Meet the Visionaries</h2>
        <p className="text-muted-foreground">The experienced professionals driving UST's mission forward.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {leaders.map((leader) => (
          <div key={leader.name} className="group flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
              <img 
                src={leader.image} 
                alt={leader.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-center">
              <h3 className="font-display text-xl font-700 text-foreground mb-1">{leader.name}</h3>
              <p className="text-accent font-semibold text-sm mb-3 tracking-wide">{leader.role}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 max-w-[240px]">{leader.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LeadershipSection;
