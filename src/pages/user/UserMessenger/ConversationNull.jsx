import { RiMessengerLine } from "react-icons/ri";

function ConversationNull() {
  // const { userData } = useContext(Clintcontex);

  return (
    <div className="  h-fit flex-row mx-56 my-60">
     
      <div className="p-3 border-2 border-black rounded-full w-fit mx-36">
        <RiMessengerLine className="size-20 font-light" />
      </div>
      
        <div className=" mt-4">
        <p className="text-center text-xl font-medium">Your messages</p>
      <p className="text-center text-gray-500">Send private messages to a friend</p>
        </div>

     
      
      
    </div>
  );
}

export default ConversationNull;
