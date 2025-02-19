const { AccessToken } = require("livekit-server-sdk");

const API_KEY = "APIZXY3xUgzLLVz"; // API Key
const API_SECRET = "RnchO8o2eNdIktTRsjaMIxneR6JdewXyz6fiwRWqdL1C"; // Secret Key

const at = new AccessToken(API_KEY, API_SECRET, { identity: "test-user" });
at.addGrant({
  roomJoin: true,
  room: "test-room",
  canPublish: true,
  canSubscribe: true,
});

console.log(at.toJwt()); // Burada token yazdırılmalı
