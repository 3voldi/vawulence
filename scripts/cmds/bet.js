const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');

module.exports.config = {
  name: "bet",
  version: "2.1",
  author: "Christus",
  countDown: 5,
  role: 0,
  shortDescription: "Casino-style bet connecté à la balance globale",
  category: "game",
  guide: { fr: "{pn} <montant> — ex: {pn} 1k" }
};

module.exports.onStart = async function ({ api, event, args, usersData }) {
  const { senderID, threadID, messageID } = event;

  // --- Fonctions utilitaires intégrées ---
  const formatBalance = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T$";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B$";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M$";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "k$";
    return num.toLocaleString() + "$";
  };

  const parseAmount = (str) => {
    str = str.toLowerCase().replace(/\s+/g, '');
    const match = str.match(/^([\d.]+)([kmbt]?)$/);
    if (!match) return NaN;
    let num = parseFloat(match[1]);
    const units = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 };
    if (match[2] && units[match[2]]) num *= units[match[2]];
    return Math.floor(num);
  };

  try {
    // 1. Récupération des données depuis la base globale (CORRECTION ICI)
    const userData = await usersData.get(senderID);
    let balance = userData.money || 0;

    if (!args[0])
      return api.sendMessage("Veuillez entrer un montant : bet 500 / bet 1k", threadID, messageID);

    const betAmount = parseAmount(args[0]);
    if (isNaN(betAmount) || betAmount <= 0)
      return api.sendMessage("Montant invalide !", threadID, messageID);

    if (betAmount > balance)
      return api.sendMessage(`Fonds insuffisants !\nSolde : ${formatBalance(balance)}`, threadID, messageID);

    // 2. Logique du jeu
    const multipliers = [3, 4, 8, 20, 50];
    const chosenMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
    const win = Math.random() < 0.3; // 30% de chance de gagner (ajustable)

    let profit = 0;
    let newBalance = balance;

    if (win) {
      profit = betAmount * chosenMultiplier;
      newBalance += profit;
    } else {
      newBalance -= betAmount;
    }

    // 3. Sauvegarde dans la base globale (CORRECTION ICI)
    await usersData.set(senderID, { ...userData, money: newBalance });

    // 4. Préparation de l'image
    const userName = await usersData.getName(senderID);
    const resultText = win ? `JACKPOT! ${chosenMultiplier}x` : "PERDU";
    
    // Avatar
    let avatar;
    try {
      const avatarUrl = `https://graph.facebook.com/${senderID}/picture?height=500&width=500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const res = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
      avatar = await loadImage(Buffer.from(res.data));
    } catch (e) { avatar = null; }

    const filePath = await generateCasinoCard({
      userName, avatar, betAmount, resultText,
      multiplier: win ? chosenMultiplier : null,
      profit: win ? profit : betAmount,
      newBalance, win, formatBalance
    });

    await api.sendMessage({
      body: win ? `🎉 Félicitations ${userName} !` : `💀 Dommage ${userName}...`,
      attachment: fs.createReadStream(filePath)
    }, threadID, messageID);

    // Nettoyage
    setTimeout(() => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); }, 15000);

  } catch (error) {
    console.error(error);
    api.sendMessage("Erreur lors de l'exécution du pari.", threadID, messageID);
  }
};

// --- Fonctions de dessin de la carte (Canvas) ---
async function generateCasinoCard(data) {
  const width = 900, height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background sombre luxe
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, width, height);
  
  // Dégradé néon
  const grad = ctx.createLinearGradient(0,0, width, height);
  grad.addColorStop(0, data.win ? '#004d26' : '#4d0000');
  grad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = grad;
  ctx.fillRect(10, 10, width-20, height-20);

  // Bordure
  ctx.strokeStyle = data.win ? '#00ff88' : '#ff4444';
  ctx.lineWidth = 5;
  ctx.strokeRect(20, 20, width-40, height-40);

  // Avatar
  if (data.avatar) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 150, 80, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(data.avatar, 70, 70, 160, 160);
    ctx.restore();
  }

  // Textes
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px Arial';
  ctx.fillText(data.userName, 260, 130);
  
  ctx.font = '30px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText(`Mise : ${data.formatBalance(data.betAmount)}`, 260, 180);

  // Résultat Central
  ctx.textAlign = 'center';
  ctx.font = 'bold 80px Arial';
  ctx.fillStyle = data.win ? '#00ff88' : '#ff4444';
  ctx.fillText(data.resultText, width/2, 320);

  // Profit/Perte
  ctx.font = 'bold 50px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText(data.win ? `+${data.formatBalance(data.profit)}` : `-${data.formatBalance(data.betAmount)}`, width/2, 400);

  // Nouveau Solde
  ctx.font = '25px Arial';
  ctx.fillStyle = '#ffd700';
  ctx.fillText(`Nouveau solde : ${data.formatBalance(data.newBalance)}`, width/2, 460);

  const cachePath = path.join(__dirname, `bet_${Date.now()}.png`);
  fs.writeFileSync(cachePath, canvas.toBuffer());
  return cachePath;
}
