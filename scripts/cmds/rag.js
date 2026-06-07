module.exports = {
  config: {
    name: "rag",
    version: "3.0.0",
    author: "Mamun",
    role: 0,
    category: "fun",
  },

  onStart: async function () {
    if (!global.ragAuto) global.ragAuto = {};
  },

  onChat: async function ({ api, event }) {
    if (!event.isGroup) return;

    if (!global.ragAuto) global.ragAuto = {};

    const threadID = event.threadID;
    const senderID = event.senderID;

    const body = (event.body || "").toLowerCase().trim();

    const clean = body.replace(/@\S+/g, "").trim();

    // default OFF (important line)
    if (global.ragAuto[threadID] !== true) {
      // only allow ON command
      if (clean === "-rag korla on") {
        const info = await api.getThreadInfo(threadID);
        const isAdmin = info.adminIDs.some(a => a.id === senderID);

        if (!isAdmin)
          return api.sendMessage("⛔ Only Admin can ON", threadID);

        global.ragAuto[threadID] = true;
        return api.sendMessage("🟢 RAG AUTO ENABLED", threadID);
      }
      return; // EVERYTHING ELSE BLOCKED when OFF
    }

    // OFF command
    if (clean === "-rag korla off") {
      const info = await api.getThreadInfo(threadID);
      const isAdmin = info.adminIDs.some(a => a.id === senderID);

      if (!isAdmin)
        return api.sendMessage("⛔ Only Admin can OFF", threadID);

      global.ragAuto[threadID] = false;
      return api.sendMessage("🔴 RAG AUTO DISABLED", threadID);
    }

    // ignore bot
    if (senderID === api.getCurrentUserID()) return;

    const text = "⏤͟͟͞͞𝗥𝗮𝗴 𝗸𝗼𝗿𝗹𝗮/-🙂";

    let name = "User";
    try {
      const infoUser = await api.getUserInfo(senderID);
      name = infoUser[senderID]?.name || "User";
    } catch (e) {
      name = "User";
    }

    return api.sendMessage(
      {
        body: `${text} ${name}`,
        mentions: [
          {
            tag: name,
            id: senderID
          }
        ]
      },
      threadID,
      event.messageID
    );
  }
};
