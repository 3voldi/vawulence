const axios = require('axios');

const BASE_URL = 'https://qizapi.onrender.com/api';

module.exports = {
  config: {
    name: "quiz",
    aliases: ["q"],
    version: "3.0",
    author: "Christus", // Modifié par Assistant pour traduction FR
    countDown: 0, 
    role: 0,
    longDescription: { 
      en: "Jeu de quiz avancé avec fonctionnalités sociales, multijoueur, succès et statistiques complètes",
      fr: "Jeu de quiz avancé avec fonctionnalités sociales, multijoueur, succès et statistiques complètes" 
    },
    category: "game",
    guide: {
      en: `{pn} <categorie>`,
      fr: `{pn} <categorie>`
    }
  },

  langs: {
    // J'ai remplacé le contenu de 'en' par du français pour forcer l'affichage FR
    // même si le bot est configuré en anglais par défaut.
    en: {
      reply: "🎯 𝗗𝗲́𝗳𝗶 𝗤𝘂𝗶𝘇\n━━━━━━━━━━\n\n📚 𝖢𝖺𝗍𝖾́𝗀𝗈𝗋𝗂𝖾: {category}\n🎚️ 𝖣𝗂𝖿𝖿𝗂𝖼𝗎𝗅𝗍𝖾́: {difficulty}\n❓ 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: {question}\n\n{options}\n\n⏰ 𝖵𝗈𝗎𝗌 𝖺𝗏𝖾𝗓 30 𝗌𝖾𝖼𝗈𝗇𝖽𝖾𝗌 𝗉𝗈𝗎𝗋 𝗋𝖾́𝗉𝗈𝗇𝖽𝗋𝖾 (A/B/C/D):",
      torfReply: "⚙ 𝗤𝘂𝗶𝘇 ( Vrai/Faux )\n━━━━━━━━━━\n\n💭 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: {question}\n\n😆: Vrai (True)\n😮: Faux (False)\n\nRéagissez avec l'emoji\n⏰ 30 secondes pour répondre",
      correctMessage: "🎉 𝗕𝗼𝗻𝗻𝗲 𝗥𝗲́𝗽𝗼𝗻𝘀𝗲 !\n━━━━━━━━━━\n\n✅ 𝖲𝖼𝗈𝗋𝖾: {correct}/{total}\n🏆 𝖯𝗋𝖾́𝖼𝗂𝗌𝗂𝗈𝗇: {accuracy}%\n🔥 𝖲𝖾́𝗋𝗂𝖾 𝖠𝖼𝗍𝗎𝖾𝗅𝗅𝖾: {streak}\n⚡ 𝖳𝖾𝗆𝗉𝗌: {time}s\n🎯 𝖷𝖯 𝖦𝖺𝗀𝗇𝖾́: +{xp}\n💰 𝖠𝗋𝗀𝖾𝗇𝗍 𝖦𝖺𝗀𝗇𝖾́: +{money}",
      wrongMessage: "❌ 𝗠𝗮𝘂𝘃𝗮𝗶𝘀𝗲 𝗥𝗲́𝗽𝗼𝗻𝘀𝗲\n━━━━━━━━━━\n\n🎯 𝖢𝗈𝗋𝗋𝖾𝖼𝗍: {correctAnswer}\n📊 𝖲𝖼𝗈𝗋𝖾: {correct}/{total}\n📈 𝖯𝗋𝖾́𝖼𝗂𝗌𝗂𝗈𝗇: {accuracy}%\n💔 𝖲𝖾́𝗋𝗂𝖾 𝖯𝖾𝗋𝖽𝗎𝖾",
      timeoutMessage: "⏰ 𝗧𝗲𝗺𝗽𝘀 𝗲́𝗰𝗼𝘂𝗹𝗲́ ! 𝖫𝖺 𝖻𝗈𝗇𝗇𝖾 𝗋𝖾́𝗉𝗈𝗇𝗌𝖾 𝖾́𝗍𝖺𝗂𝗍 : {correctAnswer}",
      achievementUnlocked: "🏆 𝗦𝘂𝗰𝗰𝗲̀𝘀 𝗗𝗲́𝘃𝗲𝗿𝗿𝗼𝘂𝗶𝗹𝗹𝗲́ !\n{achievement}\n💰 +{bonus} pièces bonus !"
    }
  },

  generateProgressBar(percentile) {
    const filled = Math.round(percentile / 10);
    const empty = 10 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  },

  getUserTitle(correct) {
    if (correct >= 50000) return '🌟 Omniscient du Quiz';
    if (correct >= 25000) return '👑 Divinité du Quiz';
    if (correct >= 15000) return '⚡ Titan du Quiz';
    if (correct >= 10000) return '🏆 Légende du Quiz';
    if (correct >= 7500) return '🎓 Grand Maître';
    if (correct >= 5000) return '👨‍🎓 Maître du Quiz';
    if (correct >= 2500) return '🔥 Expert du Quiz';
    if (correct >= 1500) return '📚 Erudit du Quiz';
    if (correct >= 1000) return '🎯 Apprenti du Quiz';
    if (correct >= 750) return '🌟 Chercheur de Savoir';
    if (correct >= 500) return '📖 Apprenant Rapide';
    if (correct >= 250) return '🚀 Étoile Montante';
    if (correct >= 100) return '💡 Débutant éclairé';
    if (correct >= 50) return '🎪 Premiers Pas';
    if (correct >= 25) return '🌱 Nouveau Venu';
    if (correct >= 10) return '🔰 Novice';
    if (correct >= 1) return '👶 Rookie';
    return '🆕 Nouveau Joueur';
  },

  async getUserName(api, userId) {
    try {
      const userInfo = await api.getUserInfo(userId);
      return userInfo[userId]?.name || 'Joueur Anonyme';
    } catch (error) {
      console.warn("User info fetch failed for", userId, error);
      return 'Joueur Anonyme';
    }
  },

  async getAvailableCategories() {
    try {
      // Tentative d'ajout de lang=fr si l'API le supporte
      const res = await axios.get(`${BASE_URL}/categories?lang=fr`);
      return res.data.map(cat => cat.toLowerCase());
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  onStart: async function ({ message, event, args, commandName, getLang, api, usersData }) {
    try {
      const command = args[0]?.toLowerCase();

      if (!args[0] || command === "help" || command === "aide") {
        return await this.handleDefaultView(message, getLang);
      }

      switch (command) {
        case "rank":
        case "profile":
        case "profil":
          return await this.handleRank(message, event, getLang, api, usersData);
        case "leaderboard":
        case "lb":
        case "top":
          return await this.handleLeaderboard(message, getLang, args.slice(1), api);
        case "category":
        case "categorie":
          if (args.length > 1) {
            return await this.handleCategoryLeaderboard(message, getLang, args.slice(1), api);
          }
          return await this.handleCategories(message, getLang);
        case "daily":
        case "jour":
          return await this.handleDailyChallenge(message, event, commandName, api);
        case "torf":
        case "vf":
          return await this.handleTrueOrFalse(message, event, commandName, api);
        case "flag":
        case "drapeau":
          return await this.handleFlagQuiz(message, event, commandName, api);
        case "anime":
          return await this.handleAnimeQuiz(message, event, commandName, api);
        case "hard":
        case "difficile":
          return await this.handleQuiz(message, event, ["general"], commandName, getLang, api, usersData, "hard");
        case "medium":
        case "moyen":
          return await this.handleQuiz(message, event, ["general"], commandName, getLang, api, usersData, "medium");
        case "easy":
        case "facile":
          return await this.handleQuiz(message, event, ["general"], commandName, getLang, api, usersData, "easy");
        case "random":
        case "aleatoire":
          return await this.handleQuiz(message, event, [], commandName, getLang, api, usersData);
        default:
          const categories = await this.getAvailableCategories();
          if (categories.includes(command)) {
            return await this.handleQuiz(message, event, [command], commandName, getLang, api, usersData);
          } else {
            return await this.handleDefaultView(message, getLang);
          }
      }
    } catch (err) {
      console.error("Quiz start error:", err);
      return message.reply("⚠️ Une erreur est survenue, réessayez.");
    }
  },

  async handleDefaultView(message, getLang) {
    try {
      const res = await axios.get(`${BASE_URL}/categories?lang=fr`);
      const categories = res.data;

      const catText = categories.map(c => `📍 ${c.charAt(0).toUpperCase() + c.slice(1)}`).join("\n");

      return message.reply(
        `🎯 𝗤𝘂𝗶𝘇\n━━━━━━━━\n\n` +
        `📚 𝗖𝗮𝘁𝗲́𝗴𝗼𝗿𝗶𝗲𝘀\n\n${catText}\n\n` +
        `━━━━━━━━━\n\n` +
        `🏆 Commandes\n` +
        `• quiz rank - Voir votre rang\n` +
        `• quiz top - Voir le classement\n` +
        `• quiz vf - Quiz Vrai ou Faux\n` +
        `• quiz drapeau - Quiz devine le pays\n` +
        `• quiz anime - Quiz personnages d'anime\n\n` +
        `🎮 Utilisation: quiz <categorie> pour lancer`
      );
    } catch (err) {
      console.error("Default view error:", err);
      return message.reply("⚠️ Impossible de charger les catégories. Essayez 'quiz help'.");
    }
  },

  async handleRank(message, event, getLang, api, usersData) {
    try {
      const userName = await this.getUserName(api, event.senderID);

      await axios.post(`${BASE_URL}/user/update`, {
        userId: event.senderID,
        name: userName
      });

      const res = await axios.get(`${BASE_URL}/user/${event.senderID}`);
      const user = res.data;

      if (!user || user.total === 0) {
        return message.reply(`❌ Vous n'avez pas encore joué ! Utilisez 'quiz random' pour commencer.\n👤 Bienvenue, ${userName}!`);
      }

      const position = user.position ?? "N/A";
      const totalUser = user.totalUsers ?? "N/A";
      const progressBar = this.generateProgressBar(user.percentile ?? 0);
      const title = this.getUserTitle(user.correct || 0);

      const streakInfo = user.currentStreak > 0 ? 
        `🔥 𝖲𝖾́𝗋𝗂𝖾 𝖠𝖼𝗍𝗎𝖾𝗅𝗅𝖾: ${user.currentStreak}${user.currentStreak >= 5 ? ' 🚀' : ''}` :
        `🔥 𝖲𝖾́𝗋𝗂𝖾 𝖠𝖼𝗍𝗎𝖾𝗅𝗅𝖾: 0`;

      const bestStreakInfo = user.bestStreak > 0 ?
        `🏅 𝖬𝖾𝗂𝗅𝗅𝖾𝗎𝗋𝖾 𝖲𝖾́𝗋𝗂𝖾: ${user.bestStreak}${user.bestStreak >= 10 ? ' 👑' : user.bestStreak >= 5 ? ' ⭐' : ''}` :
        `🏅 𝖬𝖾𝗂𝗅𝗅𝖾𝗎𝗋𝖾 𝖲𝖾́𝗋𝗂𝖾: 0`;

      const userData = await usersData.get(event.senderID) || {};
      const userMoney = userData.money || 0;

      const currentXP = user.xp ?? 0;
      const xpTo1000 = Math.max(0, 1000 - currentXP);
      const xpProgress = Math.min(100, (currentXP / 1000) * 100);
      const xpProgressBar = this.generateProgressBar(xpProgress);

      return message.reply(
        `🎮 𝗣𝗿𝗼𝗳𝗶𝗹 𝗤𝘂𝗶𝘇\n━━━━━━━━━\n\n` +
        `👤 ${userName}\n` +
        `🎖️ ${title}\n` +
        `🏆 𝖱𝖺𝗇𝗀 𝖦𝗅𝗈𝖻𝖺𝗅: #${position}/${totalUser}\n` +
        `📈 𝖯𝖾𝗋𝖼𝖾𝗇𝗍𝗂𝗅𝖾: ${progressBar} ${user.percentile ?? 0}%\n\n` +
        `📊 𝗦𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗾𝘂𝗲𝘀\n` +
        `✅ 𝖢𝗈𝗋𝗋𝖾𝖼𝗍: ${user.correct ?? 0}\n` +
        `❌ 𝖤𝗋𝗋𝖾𝗎𝗋: ${user.wrong ?? 0}\n` +
        `📝 𝖳𝗈𝗍𝖺𝗅: ${user.total ?? 0}\n` +
        `🎯 𝖯𝗋𝖾́𝖼𝗂𝗌𝗂𝗈𝗇: ${user.accuracy ?? 0}%\n` +
        `⚡ 𝖳𝖾𝗆𝗉𝗌 𝖬𝗈𝗒𝖾𝗇: ${(user.avgResponseTime ?? 0).toFixed(1)}s\n\n` +
        `💰 𝗥𝗶𝗰𝗵𝗲𝘀𝘀𝗲 & 𝗫𝗣\n` +
        `💵 𝖠𝗋𝗀𝖾𝗇𝗍: ${userMoney.toLocaleString()}\n` +
        `✨ 𝖷𝖯: ${currentXP}/1000\n` +
        `🎯 𝖷𝖯 𝗏𝖾𝗋𝗌 1000: ${xpTo1000}\n` +
        `${xpProgressBar} ${xpProgress.toFixed(1)}%\n\n` +
        `🔥 𝗜𝗻𝗳𝗼𝘀 𝗦𝗲́𝗿𝗶𝗲\n` +
        `${streakInfo}\n` +
        `${bestStreakInfo}\n\n` +
        `🎯 𝖯𝗋𝗈𝖼𝗁𝖺𝗂𝗇 𝖯𝖺𝗅𝗂𝖾𝗋: ${user.nextMilestone || "Continuez à jouer !"}`
      );
    } catch (err) {
      console.error("Rank error:", err);
      return message.reply("⚠️ Impossible de récupérer le rang. Réessayez plus tard.");
    }
  },

  async handleLeaderboard(message, getLang, args, api) {
    try {
      const page = parseInt(args?.[0]) || 1;
      const sortBy = args?.[1] || 'correct';

      const res = await axios.get(`${BASE_URL}/leaderboards?page=${page}&limit=8`);
      const { rankings, stats, pagination } = res.data;

      if (!rankings || rankings.length === 0) {
        return message.reply("🏆 Aucun joueur trouvé. Soyez le premier !");
      }

      const now = new Date();
      const currentDate = now.toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      const currentTime = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit', minute: '2-digit'
      });

      const players = await Promise.all(rankings.map(async (u, i) => {
        let userName = u.name || 'Joueur Anonyme';

        if (u.userId && userName === 'Joueur Anonyme') {
          try {
            userName = await this.getUserName(api, u.userId);
          } catch {
            userName = u.name || 'Joueur Anonyme';
          }
        }

        const position = (pagination.currentPage - 1) * 8 + i + 1;
        const crown = position === 1 ? "👑" : position === 2 ? "🥈" : position === 3 ? "🥉" : position <= 10 ? "🏅" : "🎯";
        const title = this.getUserTitle(u.correct || 0);

        const level = u.level ?? Math.floor((u.correct || 0) / 50) + 1;
        const xp = u.xp ?? (u.correct || 0) * 10;
        const accuracy = u.accuracy ?? (u.total > 0 ? Math.round((u.correct / u.total) * 100) : 0);
        const avgResponseTime = typeof u.avgResponseTime === 'number' ? `${u.avgResponseTime.toFixed(2)}s` : 'N/A';
        
        return `${crown} #${position} ${userName}\n` +
               `🎖️ ${title} | 🌟 Nv.${level} | ✨ XP: ${xp.toLocaleString()}\n` +
               `📊 ${u.correct} ✅ / ${u.wrong} ❌ (Précision: ${accuracy}%)\n` +
               `🔥 Série: ${u.currentStreak || 0} | ⚡ Moy: ${avgResponseTime}`;
      }));

      return message.reply(
        `🏆 𝗖𝗹𝗮𝘀𝘀𝗲𝗺𝗲𝗻𝘁 𝗠𝗼𝗻𝗱𝗶𝗮𝗹\n━━━━━━━━━\n\n` +
        `📅 ${currentDate}\n⏰ ${currentTime}\n\n` +
        `━━━━━━━━━\n\n${players.join('\n\n')}\n\n` +
        `📖 Page ${pagination?.currentPage || 1}/${pagination?.totalPages || 1} | 👥 Joueurs: ${stats?.totalUsers || 0}\n` +
        `🔄 Utilisation: quiz top <page>`
      );

    } catch (err) {
      console.error("Leaderboard error:", err);
      return message.reply("⚠️ Impossible de récupérer le classement.");
    }
  },

  async handleCategories(message, getLang) {
    try {
      const res = await axios.get(`${BASE_URL}/categories?lang=fr`);
      const categories = res.data;

      const catText = categories.map(c => `📍 ${c.charAt(0).toUpperCase() + c.slice(1)}`).join("\n");

      return message.reply(
        `📚 𝗖𝗮𝘁𝗲́𝗴𝗼𝗿𝗶𝗲𝘀 𝗤𝘂𝗶𝘇\n━━━━━━━━\n\n${catText}\n\n` +
        `🎯 Utilisation: quiz <categorie>\n` +
        `🎲 Aléatoire: quiz random\n` +
        `🏆 Quotidien: quiz daily\n` +
        `🌟 Spécial: quiz vf, quiz drapeau`
      );
    } catch (err) {
      console.error("Categories error:", err);
      return message.reply("⚠️ Impossible de charger les catégories.");
    }
  },

  async handleDailyChallenge(message, event, commandName, api) {
    try {
      // Ajout de lang=fr
      const res = await axios.get(`${BASE_URL}/challenge/daily?userId=${event.senderID}&lang=fr`);
      const { question, challengeDate, reward, streak } = res.data;

      const userName = await this.getUserName(api, event.senderID);

      const optText = question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n");

      const info = await message.reply(
        `🌟 𝗗𝗲́𝗳𝗶 𝗤𝘂𝗼𝘁𝗶𝗱𝗶𝗲𝗻\n━━━━━━━━━\n\n` +
        `📅 ${challengeDate}\n` +
        `🎯 Bonus: +${reward} XP\n` +
        `🔥 Série Quotidienne: ${streak}\n\n\n` +
        `❓ ${question.question}\n\n${optText}\n\n⏰ 30 secondes pour répondre !`
      );

      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer: question.answer,
        questionId: question._id,
        startTime: Date.now(),
        isDailyChallenge: true,
        bonusReward: reward
      });

      setTimeout(() => {
        const r = global.GoatBot.onReply.get(info.messageID);
        if (r) {
          message.reply(`⏰ Temps écoulé ! La bonne réponse était : ${question.answer}`);
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("Daily challenge error:", err);
      return message.reply("⚠️ Impossible de charger le défi quotidien.");
    }
  },

  async handleTrueOrFalse(message, event, commandName, api) {
    try {
      // Ajout lang=fr
      const res = await axios.get(`${BASE_URL}/question?category=torf&userId=${event.senderID}&lang=fr`);
      const { _id, question, answer } = res.data;

      const info = await message.reply(this.langs.en.torfReply.replace("{question}", question));

      const correctAnswer = answer.toUpperCase();

      global.GoatBot.onReaction.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer: correctAnswer,
        reacted: false,
        reward: 10000,
        questionId: _id,
        startTime: Date.now()
      });

      setTimeout(() => {
        const reaction = global.GoatBot.onReaction.get(info.messageID);
        if (reaction && !reaction.reacted) {
          const correctText = correctAnswer === "A" ? "Vrai" : "Faux";
          message.reply(this.langs.en.timeoutMessage.replace("{correctAnswer}", correctText));
          message.unsend(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("True/False error:", err);
      return message.reply("⚠️ Erreur lors du chargement du Vrai/Faux.");
    }
  },

  async handleFlagQuiz(message, event, commandName, api) {
    try {
      // Ajout lang=fr
      const res = await axios.get(`${BASE_URL}/question?category=flag&userId=${event.senderID}&lang=fr`);
      const { _id, question, options, answer } = res.data;

      const flagEmbed = {
        body: `🏁 𝗤𝘂𝗶𝘇 𝗗𝗿𝗮𝗽𝗲𝗮𝘂\n━━━━━━━━\n\n🌍 Devine le pays de ce drapeau :\n\n` +
              options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n") +
              `\n\n⏰ Temps: 30 secondes.`,
        attachment: question ? await global.utils.getStreamFromURL(question) : null
      };

      const info = await message.reply(flagEmbed);

      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer,
        options,
        questionId: _id,
        startTime: Date.now(),
        isFlag: true,
        reward: this.envConfig.flagReward || 10000
      });

      setTimeout(() => {
        const r = global.GoatBot.onReply.get(info.messageID);
        if (r) {
          message.reply(`⏰ Temps écoulé ! La réponse était : ${answer}`);
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("Flag quiz error:", err);
      return message.reply("⚠️ Erreur lors du quiz drapeau.");
    }
  },

  async handleAnimeQuiz(message, event, commandName, api) {
    try {
      // Ajout lang=fr
      const res = await axios.get(`${BASE_URL}/question?category=anime&userId=${event.senderID}&lang=fr`);
      const { _id, question, options, answer, imageUrl } = res.data;

      const animeEmbed = {
        body: `🎌 𝗤𝘂𝗶𝘇 𝗔𝗻𝗶𝗺𝗲\n━━━━━━━━\n\n❔ 𝗜𝗻𝗱𝗶𝗰𝗲: ${question}\n\n` +
              options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n") +
              `\n\n⏰ Temps: 30 secondes\n🎯 Reconnaissance de perso !`,
        attachment: imageUrl ? await global.utils.getStreamFromURL(imageUrl) : null
      };

      const info = await message.reply(animeEmbed);

      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        author: event.senderID,
        messageID: info.messageID,
        answer,
        options,
        questionId: _id,
        startTime: Date.now(),
        isAnime: true,
        reward: this.envConfig.animeReward || 15000
      });

      setTimeout(() => {
        const r = global.GoatBot.onReply.get(info.messageID);
        if (r) {
          message.reply(`⏰ Temps écoulé ! C'était : ${answer}\n🎌 Regarde plus d'animes !`);
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }
      }, 30000);
    } catch (err) {
      console.error("Anime quiz error:", err);
      return message.reply("⚠️ Erreur quiz anime.");
    }
  },

async handleCategoryLeaderboard(message, getLang, args, api) {
    try {
      const category = args[0]?.toLowerCase();
      if (!category) {
        return message.reply("📚 Spécifiez une catégorie pour voir le classement.");
      }

      const page = parseInt(args[1]) || 1;
      const res = await axios.get(`${BASE_URL}/leaderboard/category/${category}?page=${page}&limit=10`);
      const { users, pagination } = res.data;

      if (!users || users.length === 0) {
        return message.reply(`🏆 Aucun joueur trouvé dans la catégorie : ${category}.`);
      }

      const topPlayersWithNames = await Promise.all(users.map(async (u, i) => {
        let userName = 'Joueur Anonyme';
        if (u.userId) {
          userName = await this.getUserName(api, u.userId);
        }

        const position = (pagination.currentPage - 1) * 10 + i + 1;
        const crown = position === 1 ? "👑" : position === 2 ? "🥈" : position === 3 ? "🥉" : "🏅";
        const title = this.getUserTitle(u.correct || 0);
        return `${crown} #${position} ${userName}\n🎖️ ${title}\n📊 ${u.correct || 0}/${u.total || 0} (${u.accuracy || 0}%)`;
      }));

      const topPlayers = topPlayersWithNames.join('\n\n');

      return message.reply(
        `🏆 𝗖𝗹𝗮𝘀𝘀𝗲𝗺𝗲𝗻𝘁: ${category.charAt(0).toUpperCase() + category.slice(1)}\n━━━━━━━━━\n\n${topPlayers}\n\n` +
        `📖 Page ${pagination.currentPage}/${pagination.totalPages}\n` +
        `👥 Joueurs Total: ${pagination.totalUsers}`
      );
    } catch (err) {
      console.error("Category leaderboard error:", err);
      return message.reply("⚠️ Erreur classement catégorie.");
    }
  },

  onReaction: async function ({ message, event, Reaction, api, usersData }) {
    try {
      const { author, messageID, answer, reacted, reward } = Reaction;

      if (event.userID !== author || reacted) return;

      const userAnswer = event.reaction === '😆' ? "A" : "B"; 
      const isCorrect = userAnswer === answer;

      const timeSpent = (Date.now() - Reaction.startTime) / 1000;
      if (timeSpent > 30) {
        return message.reply("⏰ Temps écoulé !");
      }const userName = await this.getUserName(api, event.userID);

      const answerData = {
        userId: event.userID,
        questionId: Reaction.questionId,
        answer: userAnswer,
        timeSpent,
        userName
      };

      try {
        const res = await axios.post(`${BASE_URL}/answer`, answerData);
        const { user, xpGained } = res.data;

        const userData = await usersData.get(event.userID) || {};
        if (isCorrect) {
          const baseMoneyReward = 10000;
          const streakBonus = (user.currentStreak || 0) * 1000;
          const totalMoneyReward = baseMoneyReward + streakBonus;

          userData.money = (userData.money || 0) + totalMoneyReward;
          await usersData.set(event.userID, userData);

          const correctText = answer === "A" ? "Vrai" : "Faux";

          const torfSuccessMessages = [
            "🎯 𝗔𝗕𝗦𝗢𝗟𝗨𝗠𝗘𝗡𝗧 𝗩𝗥𝗔𝗜 ! 𝗧𝘂 𝗲𝘀 𝘂𝗻 𝗴𝗲́𝗻𝗶𝗲 ! ✨",
            "⚡ 𝗣𝗔𝗥𝗙𝗔𝗜𝗧 ! 𝗠𝗮𝗶̂𝘁𝗿𝗲 𝗱𝘂 𝗩𝗿𝗮𝗶/𝗙𝗮𝘂𝘅 ! 🏆",
            "🔥 𝗙𝗔𝗡𝗧𝗔𝗦𝗧𝗜𝗤𝗨𝗘 ! 𝗕𝗶𝗲𝗻 𝗷𝗼𝘂𝗲́ ! 🎯",
            "🌟 𝗕𝗥𝗔𝗩𝗢 ! 𝗦𝗶𝗺𝗽𝗹𝗲 𝗲𝘁 𝗲𝗳𝗳𝗶𝗰𝗮𝗰𝗲 ! ⭐",
            "🎊 𝗘𝗫𝗖𝗘𝗟𝗟𝗘𝗡𝗧 ! 𝗥𝗮𝗽𝗶𝗱𝗲 𝗲𝘁 𝗷𝘂𝘀𝘁𝗲 ! 🚀"
          ];

          const randomTorfMsg = torfSuccessMessages[Math.floor(Math.random() * torfSuccessMessages.length)];

          let streakMessage = "";
          const streak = user.currentStreak || 0;
          if (streak >= 5) streakMessage = "\n🔥 𝗦𝗲́𝗿𝗶𝗲 𝗶𝗻𝗰𝗿𝗼𝘆𝗮𝗯𝗹𝗲 ! 𝗖𝗼𝗻𝘁𝗶𝗻𝘂𝗲 ! 🚀";

          const successMsg = `${randomTorfMsg}\n` +
            `━━━━━━━━━\n\n` +
            `🎉 𝗙𝗲́𝗹𝗶𝗰𝗶𝘁𝗮𝘁𝗶𝗼𝗻𝘀, ${userName}! 🎉\n\n` +
            `💰 𝗔𝗿𝗴𝗲𝗻𝘁: +${totalMoneyReward.toLocaleString()} 💎\n` +
            `✨ 𝗫𝗣: +${xpGained || 15} ⚡\n` +
            `🔥 𝗦𝗲́𝗿𝗶𝗲: ${user.currentStreak || 0} 🚀\n` +
            `⏱️ 𝗧𝗲𝗺𝗽𝘀: ${timeSpent.toFixed(1)}s` + streakMessage +
            `\n\n🎯 𝗖𝗼𝗻𝘁𝗶𝗻𝘂𝗲 𝗰𝗼𝗺𝗺𝗲 𝗰̧𝗮 ! 🌟`;
          message.reply(successMsg);
        } else {
          const correctText = answer === "A" ? "Vrai" : "Faux";

          const torfWrongMessages = [
            "💔 𝗔ï𝗲 ! 𝗖'𝗲𝘀𝘁 𝗽𝗮𝗿𝗳𝗼𝗶𝘀 𝗽𝗶𝗲́𝗴𝗲𝘂𝘅 ! 🤔",
            "🌱 𝗢𝘂𝗽𝘀 ! 𝗣𝗮𝘀 𝗱𝗲 𝘀𝗼𝘂𝗰𝗶, 𝗼𝗻 𝗮𝗽𝗽𝗿𝗲𝗻𝗱 ! 📚",
            "🔄 𝗣𝗮𝘀 𝘁𝗼𝘂𝘁 𝗮̀ 𝗳𝗮𝗶𝘁 ! 𝗖'𝗲𝘁𝗮𝗶𝘁 𝘂𝗻𝗲 𝗰𝗵𝗮𝗻𝗰𝗲 𝘀𝘂𝗿 𝗱𝗲𝘂𝘅 ! 🎲",
            "⭐ 𝗙𝗮𝘂𝘅 ! 𝗟'𝗲𝗻𝘁𝗿𝗮𝗶̂𝗻𝗲𝗺𝗲𝗻𝘁 𝗽𝗮𝗶𝗲 ! 💪",
            "💫 𝗥𝗮𝘁𝗲́ ! 𝗠𝗲̂𝗺𝗲 𝗹𝗲𝘀 𝗺𝗲𝗶𝗹𝗹𝗲𝘂𝗿𝘀 𝘀𝗲 𝘁𝗿𝗼𝗺𝗽𝗲𝗻𝘁 ! 🌟"
          ];

          const randomTorfWrongMsg = torfWrongMessages[Math.floor(Math.random() * torfWrongMessages.length)];

          message.reply(`${randomTorfWrongMsg}\n` +
            `━━━━━━━━━\n\n` +
            `🎯 𝗥𝗲́𝗽𝗼𝗻𝘀𝗲 𝗖𝗼𝗿𝗿𝗲𝗰𝘁𝗲: ${correctText} ✅\n` +
            `👤 ${userName}\n` +
            `💔 𝗦𝗲́𝗿𝗶𝗲 𝗣𝗲𝗿𝗱𝘂𝗲\n\n` +
            `🔥 𝗟𝗮 𝗽𝗿𝗼𝗰𝗵𝗮𝗶𝗻𝗲 𝘀𝗲𝗿𝗮 𝗹𝗮 𝗯𝗼𝗻𝗻𝗲 ! 🚀`);
        }
      } catch (error) {
        console.error("Error updating score:", error);
      }

      global.GoatBot.onReaction.get(messageID).reacted = true;
      setTimeout(() => global.GoatBot.onReaction.delete(messageID), 1000);
    } catch (err) {
      console.error("Quiz reaction error:", err);
    }
  },

  onReply: async function ({ message, event, Reply, getLang, api, usersData }) {
    if (Reply.author !== event.senderID) return;

    try {
      const ans = event.body.trim().toUpperCase();
      if (!["A", "B", "C", "D"].includes(ans)) {
        return message.reply("❌ Répondez par A, B, C, ou D uniquement !");
      }

      const timeSpent = (Date.now() - Reply.startTime) / 1000;
      if (timeSpent > 30) {
        return message.reply("⏰ Temps écoulé !");
      }

      const userName = await this.getUserName(api, event.senderID);

      let correctAnswer = Reply.answer;
      let userAnswer = ans;

      if ((Reply.isFlag || Reply.isAnime) && Reply.options) {
        const optionIndex = ans.charCodeAt(0) - 65;
        if (optionIndex >= 0 && optionIndex < Reply.options.length) {
          userAnswer = Reply.options[optionIndex];
        }
      }

      const answerData = {
        userId: event.senderID,
        questionId: Reply.questionId,
        answer: userAnswer,
        timeSpent,
        userName
      };

      const res = await axios.post(`${BASE_URL}/answer`, answerData);

      if (!res.data) {
        throw new Error('No response data received');
      }

      const { result, user } = res.data;

      let responseMsg;

      if (result === "correct") {
        const userData = await usersData.get(event.senderID) || {};

        let baseMoneyReward = 10000;
        if (Reply.difficulty === 'hard') baseMoneyReward = 15000;
        if (Reply.difficulty === 'easy') baseMoneyReward = 7500;
        if (Reply.isFlag) baseMoneyReward = 12000;
        if (Reply.isAnime) baseMoneyReward = 15000;
        if (Reply.isDailyChallenge) baseMoneyReward = 20000;

        const streakBonus = (user.currentStreak || 0) * 1000;
        const totalMoneyReward = baseMoneyReward + streakBonus;

        userData.money = (userData.money || 0) + totalMoneyReward;
        await usersData.set(event.senderID, userData);

        const difficultyBonus = Reply.difficulty === 'hard' ? ' 🔥' : Reply.difficulty === 'easy' ? ' ⭐' : '';
        const streakBonus2 = (user.currentStreak || 0) >= 5 ? ` 🚀 Série x${user.currentStreak}!` : '';
        const flagBonus = Reply.isFlag ? ' 🏁' : '';
        const animeBonus = Reply.isAnime ? ' 🎌' : '';
        const dailyBonus = Reply.isDailyChallenge ? ' 🌟' : '';

        responseMsg = `🎉 Bonne Réponse ! 💰\n` +
          `💵 Argent: +${totalMoneyReward.toLocaleString()}\n` +
          `✨ XP: +${user.xpGained || 15}\n` +
          `📊 Score: ${user.correct || 0}/${user.total || 0} (${user.accuracy || 0}%)\n` +
          `🔥 Série: ${user.currentStreak || 0}\n` +
          `⚡ Temps: ${timeSpent.toFixed(1)}s\n` +
          `🎯 Progression XP: ${user.xp || 0}/1000\n` +
          `👤 ${userName}` + difficultyBonus + streakBonus2 + flagBonus + animeBonus + dailyBonus;
      } else {
        responseMsg = `❌ Raté ! La bonne réponse était : ${correctAnswer}\n` +
          `📊 Score: ${user.correct || 0}/${user.total || 0} (${user.accuracy || 0}%)\n` +
          `💔 Série Perdue\n` +
          `👤 ${userName}` + (Reply.isFlag ? ' 🏁' : '') + (Reply.isAnime ? ' 🎌' : '');
      }

      await message.reply(responseMsg);

      if (user.achievements && user.achievements.length > 0) {
        const achievementMsg = user.achievements.map(ach => `🏆 ${ach}`).join('\n');
        await message.reply(`🏆 Succès Déverrouillé !\n${achievementMsg}\n💰 +50,000 pièces bonus !\n✨ +100 XP bonus !`);

        const userData = await usersData.get(event.senderID) || {};
        userData.money = (userData.money || 0) + 50000;
        await usersData.set(event.senderID, userData);
      }

      message.unsend(Reply.messageID);
      global.GoatBot.onReply.delete(Reply.messageID);
    } catch (err) {
      console.error("Answer error:", err);
      const errorMsg = err.response?.data?.error || err.message || "Erreur inconnue";
      message.reply(`⚠️ Erreur lors du traitement de la réponse : ${errorMsg}`);
    }
  },

  envConfig: {
    reward: 10000,
    achievementReward: 50000,
    streakReward: 1000,
    flagReward: 12000,
    animeReward: 15000,
    dailyChallengeBonus: 20000,
    hardDifficultyReward: 15000,
    easyDifficultyReward: 7500
  }
};
