const createFuncMessage = global.utils.message;
const handlerCheckDB = require("./handlerCheckData.js");

module.exports = (
  api,
  threadModel,
  userModel,
  dashBoardModel,
  globalModel,
  usersData,
  threadsData,
  dashBoardData,
  globalData
) => {
  const handlerEvents = require(
    process.env.NODE_ENV == "development"
      ? "./handlerEvents.dev.js"
      : "./handlerEvents.js"
  )(
    api,
    threadModel,
    userModel,
    dashBoardModel,
    globalModel,
    usersData,
    threadsData,
    dashBoardData,
    globalData
  );

  return async function (event) {

    // =========================
    // 🔐 ADMIN INBOX SYSTEM
    // =========================
    const adminIDs = global.GoatBot.config.adminBot || [];
    const isAdmin = adminIDs.includes(event.senderID);

    // 🚫 Only admins can use inbox
    if (global.GoatBot.config.antiInbox === true) {
      if (event.isGroup === false && !isAdmin) {
        return;
      }
    }

    const message = createFuncMessage(api, event);

    await handlerCheckDB(usersData, threadsData, event);

    let handlerChat;
    try {
      handlerChat = await handlerEvents(event, message);
    } catch (err) {
      console.error("❌ handlerEvents error:", err);
      return;
    }

    if (!handlerChat) return;

    const safeCall = (fn) => typeof fn === "function" && fn();

    const {
      onAnyEvent,
      onFirstChat,
      onStart,
      onChat,
      onReply,
      onEvent,
      handlerEvent,
      onReaction,
      typ,
      presence,
      read_receipt
    } = handlerChat;

    safeCall(onAnyEvent);

    switch (event.type) {
      case "message":
      case "message_reply":
      case "message_unsend":
        safeCall(onFirstChat);
        safeCall(onChat);
        safeCall(onStart);
        safeCall(onReply);
        break;

      case "event":
        safeCall(handlerEvent);
        safeCall(onEvent);
        break;

      case "message_reaction":
        safeCall(onReaction);

        // 💣 React-Unsend System
        try {
          const cfg = global.GoatBot.config.reactUnsend || {};
          const adminIDs = global.GoatBot.config.adminBot || [];
          const reactorID = event.userID || event.senderID;
          const isAdminReact = adminIDs.includes(reactorID);

          if (
            cfg.enable &&
            cfg.emojis?.includes(event.reaction) &&
            (!cfg.onlyAdmin || isAdminReact)
          ) {
            await api.unsendMessage(event.messageID);
          }
        } catch (err) {
          console.error("❌ React-Unsend Error:", err);
        }

        break;

      case "typ":
        safeCall(typ);
        break;

      case "presence":
        safeCall(presence);
        break;

      case "read_receipt":
        safeCall(read_receipt);
        break;

      default:
        break;
    }
  };
};
