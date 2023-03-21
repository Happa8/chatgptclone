import { atom } from "jotai";
import { Message } from "./App";

export const ApikeyAtom = atom<string>("");

const APIURL = "https://api.openai.com/v1/chat/completions";
export const ModelsList = ["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"] as const;
export type Models = typeof ModelsList[number];

// export const ApikeyAtom = atom<string>("");
export const MessagesAtom = atom<Message[]>([]);
export const PostStatusAtom = atom<"loaded" | "loading" | "error">("loaded");
export const PostMessageAtom = atom(
  (get) => get(MessagesAtom),
  async (get, set, mes: Message) => {
    set(PostStatusAtom, "loading");
    await fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + get(ApikeyAtom),
      },
      body: JSON.stringify({
        model: get(CurrentModelAtom),
        messages: [...get(MessagesAtom), mes],
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error("Server Error");
        }
        // console.log(res);
        // console.log(((await res.json()) as any).choices[0].message);
        const resmes = ((await res.json()) as any).choices[0]
          .message as Message;
        set(MessagesAtom, [...get(MessagesAtom), mes, resmes]);
        set(InputPromptAtom, "");
        set(PostStatusAtom, "loaded");
      })
      .catch((err) => {
        console.error("Error occured", err);
        set(PostStatusAtom, "error");
      });
  }
);
export const InputPromptAtom = atom<string>("");

export const IsSettingModalOpenAtom = atom<boolean>(true);

export const CurrentModelAtom = atom<Models>("gpt-3.5-turbo");
