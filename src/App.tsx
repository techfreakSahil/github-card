import { ChangeEvent, useState } from "react";
import "./App.css";
import { useDownloader } from "./hooks/useDownloader";
import Footer from "./components/footer";
import { UserCard } from "./components/usercard";

export interface User {
  id: number;
  login?: string;
  avatar_url: string;
  followers: number;
  following: number;
  name: string | undefined;
  public_repos: number;
  message?: string;
}
function Button({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-gray-800 w-2/3 px-3 py-1 rounded-xl text-white hover:bg-gray-700 shadow-sm"
      onClick={onClick}
    >
      {content}
    </button>
  );
}

const App = () => {
  const [username, setUserName] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [repos, setRepos] = useState<any[]>([]);
  const [userfound, setUserFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const generateInfoHandler = async () => {
    if (!username) {
      setUserFound(false);
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const responserepo = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (response.status === 404) {
        setUserFound(false);
        setIsLoading(false);
        return;
      }
      setUserFound(true);
      const data: User = await response.json();
      setUser(data);
      const repodata = await responserepo.json();
      const repoArray = Object.values(repodata);
      setRepos(repoArray.splice(0, 4));
    } catch (error) {
      setUserFound(false);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const downloadHandler = () => {
    useDownloader();
  };

  return (
    <div className=" bg-zinc-950 min-w-screen min-h-screen flex justify-center items-center flex-col">
      <div className="bg-white border-gray-300 rounded-xl p-4 mt-4 w-[400px] shadow-md flex flex-col items-center gap-4">
        <h2>
          <span className="font-[logo] text-4xl font-semibold text-gray-900">
            GitHub Card Generator
          </span>
        </h2>
        <label className="font-[logo] text-xl self-start font-normal text-gray-700">
          Enter username
        </label>
        <input
          type="text"
          placeholder="Your username"
          onChange={handleInputChange}
          className="
    px-3 py-2 font-[logo] rounded-xl relative bg-[#fff] text-black text-sm border border-[#384240] w-full
    focus:outline-none focus:ring-2 focus:ring-[#05386B] transition duration-200 ease-in-out
    shadow-sm placeholder-gray-500"
        ></input>
        <button
          className="
    bg-gray-800 w-2/3 px-3 py-1 rounded-xl text-white hover:bg-gray-700  
    shadow-sm"
          onClick={generateInfoHandler}
        >
          Generate
        </button>
        {userfound ? (
          <>
            {user && <UserCard user={user} repos={repos} />}
            <Button content="Download" onClick={downloadHandler} />
          </>
        ) : (
          !isLoading && (
            <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-xl shadow-sm mt-4 text-center">
              User not found
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
