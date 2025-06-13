import Image from "next/image";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { ShieldCheck, Activity, Code, Lock, BrainCircuit } from "lucide-react"; // Updated icons

const projects = [
  {
    Icon: ShieldCheck, // Updated icon
    name: "Real-Time Threat Detection",
    description:
      "Build neural networks to analyze network traffic patterns and detect zero-day exploits using deep packet inspection.",
    href: "/attacks/threat-detection",
    background: (
      <Image
        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"
        alt="Network threat detection visualization"
        fill
        style={{ objectFit: "cover" }}
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Activity, // Updated icon
    name: "Phishing Detection NLP",
    description:
      "Develop transformer models to analyze email content and URLs for social engineering attacks with 99.2% accuracy.",
    href: "/attacks/phishing-detection",
    background: (
      <Image
        src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
        alt="Phishing email analysis interface"
        fill
        style={{ objectFit: "cover" }}
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Code, // Updated icon
    name: "Malware Classification",
    description:
      "Create CNN architectures for static/dynamic analysis of executable files using entropy graphs and API call sequences.",
    href: "/attacks/malware-classification",
    background: (
      <Image
        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
        alt="Malware code visualization"
        fill
        style={{ objectFit: "cover" }}
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Lock, // Updated icon
    name: "Adversarial Defense",
    description:
      "Implement GAN-based systems to harden models against evasion attacks using defensive distillation techniques.",
    href: "/attacks/adversarial-defense",
    background: (
      <Image
        src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80"
        alt="Adversarial pattern visualization"
        fill
        style={{ objectFit: "cover" }}
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BrainCircuit, // Updated icon
    name: "Anomaly Detection",
    description:
      "Develop LSTM-autoencoders for identifying suspicious behavior in cloud infrastructure logs and SIEM data.",
    href: "/attacks/anomaly-detection",
    background: (
      <Image
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
        alt="Network anomaly heatmap"
        fill
        style={{ objectFit: "cover" }}
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {projects.map((project) => (
        <BentoCard key={project.name} {...project} />
      ))}
    </BentoGrid>
  );
}
