import { ChangeEvent, useState } from "react";
import "./App.css";
import { FaHeart, FaLinkedin, FaGithub } from "react-icons/fa";
import Card from "./Card";
import { useDownloader } from "./hooks/useDownloader";

interface User {
  id: number;
  login?: string;
  avatar_url: string;
  followers: number;
  following: number;
  name: string | undefined;
  public_repos: number;
}

const App = () => {
  const [username, setUserName] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const TOKEN = import.meta.env.VITE_TOKEN;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const generateRepos = async () => {
    try {
      const responserepo = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const repodata = await responserepo.json();
      const repoArray = Object.values(repodata);
      setRepos(repoArray.splice(0, 4));
    } catch (error) {
      setIsLoading(false);
      console.log("error");
    }
  };

  const generateHandler = async () => {
    if (!username) {
      setIsLoading(false);
    }
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data: User = await response.json();
      setUser(data);
    } catch (error) {
      setIsLoading(false);
      console.log("error");
    }
    generateRepos();
  };

  const downloadHandler = () => {
    useDownloader();
  };

  return (
    <div className=" bg-[#8EE4AF] min-w-screen min-h-screen flex justify-center items-center flex-col">
      <div className=" bg-[#5CDB95] border-[#68b485] rounded-lg p-4 w-[400px] shadow-md flex flex-col items-center gap-6">
        <h2 className="">
          <span className="font-[logo] text-2xl font-semibold text-[#05386B]">
            GitHub Card Generator
          </span>
        </h2>
        <label className="font-[logo] text-xl font-normal">
          Enter username
        </label>
        <input
          type="text"
          placeholder="username"
          onChange={handleInputChange}
          className="
  px-2 py-2 font-[logo] relative bg-[#fff] rounded-md text-black text-sm border border-[#379683] w-full"
        ></input>
        <button
          className="bg-[#05386B] px-3 py-1 rounded-md text-white hover:bg-[#345f8a]"
          onClick={generateHandler}
        >
          Generate
        </button>
        {isLoading ? (
          <>
            <Card
              avatar={user?.avatar_url}
              idname={user?.name ? user.name : user?.login}
              followers={user?.followers}
              following={user?.following}
              repocount={user?.public_repos}
              repos={repos}
            />
            {isLoading ? (
              <button
                className="bg-[#05386B] px-3 py-1 w-full rounded-md text-white hover:bg-[#345f8a]"
                onClick={downloadHandler}
              >
                Download
              </button>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
      <div className="m-5 mb-3 text-lg text-[#fff] flex gap-2 font-[logo] ">
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
    </div>
  );
};

export default App;
