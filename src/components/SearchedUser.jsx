import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Login/useUser";
import { createChat } from "../lib/services";

function SearchedUser({ searcheduser }) {
  const { user } = useUser();
  const {user_metadata} = user?.user
  const queryClient = useQueryClient();
  const { mutate: addUser, isLoading } = useMutation({
    mutationFn: ({ newChat }) => createChat(newChat),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["recentchat"]});
    },
  });
  function handleaddtoChat(e) {
    e.preventDefault();
    const newChat = {
      receiverId: searcheduser?.uuid,
      content: [],
      senderId: user?.user?.id,
      receiverfullName: searcheduser?.fullName,
      receiveravatar:searcheduser?.avatar,
      senderavatar:user_metadata?.avatar,
      senderfullName:user_metadata?.fullName
    };

    addUser({ newChat });
  }
  return (
    <form
      className="flex gap-2 items-center justify-between border border-slate-300 bg-purple-950 p-2 rounded-md"
      key={searcheduser?.id}
      onSubmit={handleaddtoChat}
    >
      <div className="flex gap-2 items-center">
        {/* <input type="text" defaultValue={user.uuid} className="hidden" /> */}
        <img
          src={searcheduser?.avatar}
          className="w-9 h-9 rounded-full ring-1 ring-gray-500 "
        />
        <h2 className="font-semibold text-slate-50">
          {searcheduser?.fullName}  {user?.user?.id === searcheduser?.uuid &&  <span className="text-xs">(yourself)</span>}
        </h2>
      </div>
      <button className="text-xs font-semibold bg-purple-700 text-gray-50 p-1 rounded-sm" disabled={user?.user?.id === searcheduser?.uuid}>
        Start Chat
      </button>
    </form>
  );
}

export default SearchedUser;
