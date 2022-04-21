import { useQuery } from "react-query";
import { api } from "../api";

type User = {
    name: string;
    course: string;
    period: string;
    phone: number;
    email: string;
    avatar: string;
}


export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

  const users = data.users.map((congressista) => {
    return {
      id: congressista.id,
      name: congressista.name,
      email: congressista.email,
      course: congressista.course,
      period: congressista.period,
      phone: congressista.phone,   
      avatar: congressista.avatar,
    };
  });

  return users
;}

export async function getUser(id: Number): Promise<User> {
  const { data } = await api.get(`users/${id}`);

  const user = data.user;
   

  return user
  ;}

export function useUsers() {
    return useQuery<User[]>("users", getUsers, {
        staleTime: 1000 * 5,
      }
    );
  }

  export function useUser(id: Number){
    return useQuery<User>("user", () => getUser(id), {
      staleTime: 1000 * 5,
    }
  );
  }

