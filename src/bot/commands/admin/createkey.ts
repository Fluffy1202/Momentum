export { }

import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
const Api = require('../../../model/api');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createkey')
		.setDescription('Creates a new api key')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),

	async execute(interaction) {

		await interaction.deferReply({ ephemeral: true });

		const newKey = new Api({
			created: Date.now(),
			apiKey: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
			access: "user",
		}, async (err, api) => {
			if (err) return console.log(err);
			console.log(api);
		});

		newKey.save()
			.then(async result => {
				await interaction.editReply({ content: "Api key created! Key: " + result.apiKey });
			})
			.catch(async error => {
				console.error(error);
				await interaction.editReply({ content: "An error occured while creating the api key" });
			});

	},
};