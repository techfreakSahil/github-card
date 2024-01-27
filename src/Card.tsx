import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import github from "./assets/github.webp";

const Card = ({
  avatar,
  idname,
  followers,
  following,
  repocount,
  repos,
}: any) => {
  return (
    <div id="card" className="bg-[#F5F5F5] relative w-full h-full p-3 mt-3">
      <img
        src={github}
        className="opacity-[0.2] z-5 absolute top-[200px] right-[120px]"
      ></img>
      <div className="relative bg-[#bac5cf] w-full shadow-lg h-[150px]">
        <img
          src={avatar}
          height={80}
          width={80}
          className="rounded-full absolute right-[140px] -bottom-5"
        ></img>
      </div>
      <div className="w-full text-center mt-5 font-[head] text-2xl text-[#527564]">
        {idname}
      </div>
      <div className="flex w-full gap-4 p-8 font-[logo]">
        <div className="flex flex-col">
          <p className="text-xl text-[#345f8a]">Followers</p>
          <p className="text-center text-lg font-bold text-[#05386B]">
            {followers}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-xl text-[#345f8a]">Following</p>
          <p className="text-center text-lg font-bold text-[#05386B]">
            {following}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-xl text-[#345f8a]">Repository</p>
          <p className="text-center text-lg font-bold text-[#05386B]">
            {repocount}
          </p>
        </div>
      </div>

      {repos.map(
        (repo: {
          id: string | undefined;
          name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | null
            | undefined;
        }) => (
          <div
            id={repo?.id}
            className="bg-[#4c4b47] z-10 border shadow-md  text-center m-4 py-4 rounded-md hover:bg-[#379683] text-white"
          >
            <p className="font-[logo] text-md text-white">{repo.name}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Card;
