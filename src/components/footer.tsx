import { FaGithub, FaHeart, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="m-5 mb-3 text-lg text-[#fff] flex items-center justify-center gap-2 font-[logo] ">
        Made with <FaHeart color="red" />
        by Md Sahil Khan
      </div>
      <div className="flex gap-5 mb-3">
        <a href="https://github.com/techfreakSahil">
          <FaGithub size={20} color="white" />
        </a>
        <a href="https://www.linkedin.com/in/md-sahil-khan-133490227/">
          <FaLinkedin size={20} color="white" />
        </a>
      </div>
    </>
  );
};

export default Footer;
