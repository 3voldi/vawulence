const { getTime } = global.utils;

module.exports = {
  config: {
    name: "autoinvite",
    version: "2.5",
    author: "Mohammad Akash",
    category: "events"
  },

  onStart: async ({ api, event, usersData, message }) => {
    if (event.logMessageType !== "log:unsubscribe") return;

    const { threadID, logMessageData, author } = event;
    const leftID = logMessageData.leftParticipantFbId;

    // Si quelqu'un part de lui-même (pas une expulsion/kick)
    if (leftID === author) {
      const userName = await usersData.getName(leftID);

      // Map pour mettre le nom en gras (Messenger-friendly)
      const boldMap = {
        A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
        K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
        U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
        a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
        k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
        u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇"
      };

      const boldName = userName.split("").map(c => boldMap[c] || c).join("");

      const form = {
        body: `🛑 Oh l'idiot... !! 😹  
${boldName}  
💬 Tu croyais vraiment que quitter le groupe était aussi simple ? 😏  
👑 Dans un groupe où JE suis présent..?? 🐸  
⚠️ C'est impossible de s'échapper d'ici, mon frère ! 😂  
🌀 Allez, je t'ai réajouté d'office 😇  

━━━━━━━━━━━━━━━
👑 𝗣𝗿𝗼𝗽𝗿𝗶𝗼 𝗱𝘂 𝗕𝗼𝘁 : Christus 💎
━━━━━━━━━━━━━━━`
      };

      try {
        await api.addUserToGroup(leftID, threadID);
        await message.send(form);
      } catch (err) {
        message.send("⚠️ Désolé, je n'ai pas pu réajouter l'utilisateur. Ses paramètres de confidentialité bloquent peut-être l'ajout.");
      }
    }
  }
};
