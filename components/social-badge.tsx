import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const SocialBadge = ({
  platform,
}: {
  platform: "linkedin" | "twitter" | "github";
}) => {
  const platforms = {
    linkedin: {
      icon: <FaLinkedin className="h-4 w-4 text-white" />,
      bg: "bg-blue-600",
    },
    twitter: {
      icon: <FaTwitter className="h-4 w-4 text-white" />,
      bg: "bg-sky-500",
    },
    github: {
      icon: <FaGithub className="h-4 w-4 text-white" />,
      bg: "bg-gray-800",
    },
  };

  return (
    <div
      className={`absolute -bottom-1 -right-1 rounded-full p-1.5 ${platforms[platform].bg}`}
    >
      {platforms[platform].icon}
    </div>
  );
};

export default SocialBadge;
