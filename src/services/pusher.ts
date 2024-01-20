import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1743712",
  key: "1b1ab7b5ab28cae45fd8",
  secret: "8bfd4f1c656880d939b0",
  cluster: "us2",
  useTLS: true,
});

export default pusher;
