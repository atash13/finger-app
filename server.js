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

try {
  const token = at.toJwt(); // Token üret
  console.log("Generated Token:", token); // Konsola yazdır
} catch (error) {
  console.error("Error generating token:", error);
}
