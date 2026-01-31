// —————————————— CHECK USE BOT —————————————— //
						if (!body || !body.startsWith(prefix)) return;

						// 🎯 FIXED: Prefix Only Text Response
						if (body.trim() === prefix.trim()) {
								const userName = userData.name || senderID;
								if (!hideNotiMessage.prefixOnly)
										return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "prefixOnly", userName, prefix));
								else
										return true;
						}

						const dateNow = Date.now();
						const args = body.slice(prefix.length).trim().split(/ +/);

						// ————————————  CHECK HAS COMMAND ——————————— //
						let commandName = args.shift().toLowerCase();
						let command = GoatBot.commands.get(commandName) || GoatBot.commands.get(GoatBot.aliases.get(commandName));

						// ———————— CHECK ALIASES SET BY GROUP ———————— //
						const aliasesData = threadData.data.aliases || {};
						for (const cmdName in aliasesData) {
								if (aliasesData[cmdName].includes(commandName)) {
										command = GoatBot.commands.get(cmdName);
										break;
								}
						}

						if (command) commandName = command.config.name;

						// 🎯 NEW: SMART MENTION HANDLING (Name to ID)
						if (args.length > 0) {
								const firstArg = args[0];
								// Check if it's a mention (starts with @) and not a numeric ID
								if (firstArg.startsWith('@') && !/^\d+$/.test(firstArg.slice(1))) {
										const fullSearchText = args.join(" ").replace(/^@/, "");
										const foundID = await resolveMentionFromBody(body, threadID, api, fullSearchText);
										if (foundID) {
												args[0] = foundID; // Replace first arg with ID
												while (args.length > 1) args.pop(); // Clear others
										}
								} else if (!/^\d+$/.test(firstArg) && !firstArg.startsWith('@')) {
										// Handle plain names
										const fullSearchText = args.join(" ");
										const foundID = await resolveMentionFromBody(body, threadID, api, fullSearchText);
										if (foundID) {
												args[0] = foundID;
												while (args.length > 1) args.pop();
										}
								}
                        }
