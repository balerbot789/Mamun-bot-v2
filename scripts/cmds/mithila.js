module.exports = {
  config: {
      name: "mithila",
          version: "1.0.0",
              author: "〲MAMUNツ࿐ T.T　o.O",
                  role: 0,
                      shortDescription: "Mithila Profile",
                          longDescription: "Show Mithila custom profile",
                              category: "Information",
                                  guide: {
                                        en: "{pn}"
                                            }
                                              },
  onStart: async function () {},
  onChat: async function ({ api, event }) {
      try {
            const msg = event.body?.toLowerCase()?.trim();
      if (msg !== "mithila") return;
      const profileText = ` ⏤͟͟͞͞𝙊𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  ☺︎
                   ⏤͟͟͞͞☺︎ ┏━━━━━━━━━━━━━━━
                                  ⏤͟͟͞͞𝐍𝐚𝐦𝐞 ➯ 𝑴𝑰𝑻𝑯𝑰𝑳𝑨 ⏤͟͟͞͞ ᜊ🐱
                                                 
⏤͟͟͞͞𝐍𝐢𝐜𝐤𝐧𝐚𝐦𝐞 ➯⏤͟͟͞͞ 𝑵𝒂𝒈𝒊𝒏 🐍

⏤͟͟͞͞𝐂𝐨𝐮𝐧𝐭𝐫𝐲 ➯⏤͟͟͞͞𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡 🇧🇩

🏤⏤͟͟͞͞𝐇𝐨𝐦𝐞 ➯⏤͟͟͞͞𝑪𝑼𝑴𝑰𝑳𝑳𝑨 🎀☠️

🏛️⏤͟͟͞͞𝐃𝐢𝐬𝐭𝐫𝐢𝐜𝐭 ➯⏤͟͟͞͞𝑪𝑶𝑻𝑻𝑶𝑮𝑹𝑨𝑴 💀

⛪⏤͟͟͞͞𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 ➯ 𝑺𝑺𝑪 𝑬𝑿𝑨𝑴

⏤͟͟͞͞𝐀𝐠𝐞 ➯ 17  😊❤️‍🩹

🕌⏤͟͟͞͞𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 ➯ 𝐈𝐬𝐥𝐚𝐦 ❤️🖤♡♡

⏤͟͟͞͞𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 ➯ 𝑴𝑰𝑵𝑮𝑳𝑬 ‍♡

⏤͟͟͞͞𝐁𝐞𝐬𝐭 𝐅𝐧𝐝➯ 𝑨𝑺𝑬 ,,🙃

⏤͟͟͞͞𝐅𝐯𝐭 𝐂𝐨𝐥𝐨𝐮𝐫➯ ⏤͟͟͞͞𝐁𝐥𝐚𝐜𝐤 😺🖤

⏤͟͟͞͞𝐅𝐯𝐭 𝐌𝐚𝐧➯ ^᪲᪲᪲𝑨𝑺𝑬 ♥︎㋛︎


⏤͟͟͞͞𝐶𝐴𝐻𝑇 𝐵𝑂𝑇  ⏤͟͟͞͞ ☻ 𝑀𝐼𝑇𝐻𝐼𝐿𝐴
               ⏤͟͟͞͞𝑂𝑊𝑁𝐸𝑅⏤☺︎ `;
      return api.sendMessage(
              profileText,
                      event.threadID,
                              event.messageID
                                    );
    } catch (err) {
          console.log(err);
      return api.sendMessage(
              "❌ Error occurred while running command.",
                      event.threadID,
                              event.messageID
                                    );
                                        }
                                          }
                                          };
