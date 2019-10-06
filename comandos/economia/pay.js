const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  const valor = parseInt(args[1]);

  let member = message.mentions.users.first();
  if (!member) return message.reply("mencione um usuário para enviar um pagamento.");
  if (member.id === message.author.id) return message.reply("você não pode fazer um pagamento para você mesmo!");
  if(isNaN(args[1])) return message.reply('valor de coins inválido, insira um valor válido');
  

  let doador = await database.Users.findOne({
    '_id': message.author.id
  });

  if (doador.coins < valor) return message.reply("você não tem coins suficientes para isso!");



  let membro = await database.Users.findOne({
    '_id': member.id
  });

  doador.coins -= valor
  membro.coins += valor
  membro.save();
  doador.save();

  await message.channel.send(`${message.author} você enviou **${valor}** coins para ${member} com sucesso!`);
}

exports.help = {
  name: 'pay',
  aliases: ['pagar', 'doar'],
}