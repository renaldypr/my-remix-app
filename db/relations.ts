import { relations } from "drizzle-orm/relations";
import { users , profiles } from "./schema";

export const profilesRelations = relations(profiles, ({one}) => ({
	usersInAuth: one(users, {
		fields: [profiles.id],
		references: [users.id]
	}),
}));

export const usersInAuthRelations = relations(users, ({many}) => ({
	profiles: many(profiles),
}));
