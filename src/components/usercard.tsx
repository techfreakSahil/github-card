import { User } from "../App";
import Card from "./card";
export function UserCard({ user, repos }: { user: User; repos: any[] }) {
  return (
    <Card
      avatar={user?.avatar_url}
      idname={user?.name ? user.name : user?.login}
      followers={user?.followers}
      following={user?.following}
      repocount={user?.public_repos}
      repos={repos}
    />
  );
}
