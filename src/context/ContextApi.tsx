"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IContextApi, IGetPlaylist, IPlaylistCreate, TYPE_ACTION, TYPE_STATE } from "@/lib/types/types";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useContext, useReducer } from "react";

const contextState: IContextApi = {
  getPlaylists: async () => {},
  createPlaylist: async () => {},
  addToPlaylist: async () => {},
  state: {
    data: [],
    isPromptAvailable: false,
    loading: false,
    error: {},
  },
  dispatch: (TYPE_ACTION): void => {},
};

const initialState: TYPE_STATE = {
  data: [],
  isPromptAvailable: false,
  loading: false,
  error: {},
};

const stateReducer = (state: TYPE_STATE, action: TYPE_ACTION): TYPE_STATE => {
  switch (action.type) {
    case "PENDING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, isPromptAvailable: action.payload?.isTrue!, data: action.payload?.data! };
    case "FAILED":
      return { ...state, loading: false, error: { ...action.payload } };
    default:
      throw new Error("Wrong action type selection");
  }
};

const Context = createContext<IContextApi>(contextState);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { data } = useSession();
  const { toast } = useToast();

  const getPlaylists = async ({ limit, offset, csv = false }: IGetPlaylist) => {
    try {
      dispatch({ type: "PENDING" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/tracks/me?limit=${limit}&offset=${offset}&csv=${csv}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data?.access_token }),
          cache: "no-cache",
        },
      );
      const result = csv ? res.text() : res.json();
      if (!csv) {
        return result;
      }
      dispatch({ type: "SUCCESS", payload: await result });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FAILED", payload: { data: error } });
    }
  };

  const createPlaylist = async ({ name, description, isPublic }: IPlaylistCreate) => {
    try {
      dispatch({ type: "PENDING" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/playlist/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
        }),
        cache: "no-cache",
      });

      const result = await res.json();

      const uris = state.data.map((item: any) => item.uri);
      await addImageToPlaylist({ playlistId: result.id });
      await addToPlaylist({ playlistId: result.id, uris });
      dispatch({ type: "SUCCESS", payload: { data: result.data, isTrue: false } });
      toast({
        duration: 99999,
        title: "Playlist created",
        description: "Tracks send to playlist successfully",
        action: (
          <a href={`spotify://playlist/${result.external_urls.spotify}`}>
            <Button className="w-[125px]">Go to Playlist</Button>
          </a>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
      console.log(error);
    }
  };

  const addToPlaylist = async ({ playlistId, uris }: { playlistId: string; uris: string[] }) => {
    try {
      dispatch({ type: "PENDING" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/playlist/${playlistId}/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: uris,
          position: 0,
        }),
        cache: "no-cache",
      });

      return { state: res.status, success: res.ok };
    } catch (error) {
      dispatch({ type: "FAILED", payload: { data: error } });
      console.log(error);
    }
  };

  const addImageToPlaylist = async ({ playlistId }: { playlistId: string }) => {
    return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/playlist/${playlistId}/image`, {
      method: "PUT",
      cache: "no-cache",
    }).then((res) => res.json());
  };

  const contextData: IContextApi = {
    addToPlaylist,
    getPlaylists,
    createPlaylist,
    state,
    dispatch,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};

const useContextApi = () => {
  return useContext(Context);
};
export default useContextApi;
