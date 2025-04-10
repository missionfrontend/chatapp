import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChat } from "../lib/services";
import { useSearchParams } from "react-router";

export function useSendChat() {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const queryClient = useQueryClient();
  const { mutate: SendChat, isLoading } = useMutation({
    mutationFn: sendChat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chatuser"],
        
      });
      
    },
  });

  return {SendChat,isLoading};
}
