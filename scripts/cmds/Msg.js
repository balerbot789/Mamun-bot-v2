module.exports = {
	config: {
		name: "msg",
		version: "1.0",
		author: "〲MAMUNツ࿐",
		countDown: 5,
		role: 0,
		shortDescription: "Broadcast notification",
		longDescription: "Send notification to all groups and receive replies",
		category: "admin",
		guide: "{pn} <message>"
	},

	onStart: async function ({ api, args, message, threadsData }) {
		const ADMIN_GROUP_ID = "4095426180772827";

		const content = args.join(" ");
		if (!content)
			return message.reply("❌ | Please enter a message.");

		const allThreads = await threadsData.getAll();
		let success = 0;

		for (const thread of allThreads) {
			if (!thread.threadID || thread.threadID == ADMIN_GROUP_ID)
				continue;

			try {
				api.sendMessage(
					`📢 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡\n\n${content}\n\n↩️ Reply to this message to contact Admin.`,
					thread.threadID,
					(error, info) => {
						if (!error && info) {
							global.GoatBot.onReply.set(info.messageID, {
								commandName: "msg",
								type: "userReply",
								threadID: thread.threadID,
								adminGroup: ADMIN_GROUP_ID
							});
						}
					}
				);

				success++;
			}
			catch (e) {}
		}

		return message.reply(`✅ | Notification sent to ${success} groups.`);
	},

	onReply: async function ({
		api,
		event,
		Reply,
		message,
		usersData,
		threadsData
	}) {

		if (Reply.type === "userReply") {

			let userName = "Unknown User";
			let groupName = "Unknown Group";

			try {
				const userData = await usersData.get(event.senderID);
				userName = userData?.name || "Unknown User";
			}
			catch (e) {}

			try {
				const threadData = await threadsData.get(event.threadID);
				groupName = threadData?.threadName || "Unknown Group";

				if (groupName === "Unknown Group") {
					const threadInfo = await api.getThreadInfo(event.threadID);
					groupName = threadInfo.threadName || "Unknown Group";
				}
			}
			catch (e) {}

			const msg =
`📩 𝗡𝗘𝗪 𝗥𝗘𝗣𝗟𝗬

👤 User: ${userName}
🆔 UID: ${event.senderID}

🏘️ Group: ${groupName}
🆔 TID: ${event.threadID}

💬 Message:
${event.body}`;

			api.sendMessage(
				msg,
				Reply.adminGroup,
				(error, info) => {
					if (!error && info) {
						global.GoatBot.onReply.set(info.messageID, {
							commandName: "msg",
							type: "adminReply",
							threadID: event.threadID,
							senderID: event.senderID
						});
					}
				}
			);
		}

		if (Reply.type === "adminReply") {
			await api.sendMessage(
				`📨 𝗔𝗗𝗠𝗜𝗡 𝗥𝗘𝗣𝗟𝗬\n\n${event.body}`,
				Reply.threadID
			);

			return message.reply("✅ | Reply sent successfully.");
		}
	}
};
