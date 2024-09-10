import { pgTable, foreignKey, uuid, timestamp, text, pgSchema, pgEnum } from "drizzle-orm/pg-core"

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
	id: uuid('id').primaryKey(),
});

export const profiles = pgTable("profiles", {
	id: uuid("id").primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	username: text("username"),
},
(table) => {
	return {
		profilesIdFkey: foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "profiles_id_fkey"
		}).onDelete("cascade"),
	}
});

export const AccessType = pgEnum('access_type', ['public', 'private', 'invite-only']);

export const communities = pgTable('communities', {
	id: uuid("id").primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  type: text('type'),
  mainLanguage: text('main_language'),
  platform: text('platform'),
  geographicFocus: text('geographic_focus'),
  accessType: AccessType('accessibility'),
  moderationStyle: text('moderation_style'),
  creationDate: timestamp('creation_date', { withTimezone: true, mode: 'string' }),
  communityImage: text('community_image'),
});

export type Community = typeof communities.$inferSelect;
