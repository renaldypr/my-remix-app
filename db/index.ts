import { sql, type ExtractTablesWithRelations } from 'drizzle-orm';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import { drizzle, type PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { type Session } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const connectionString = process.env.DATABASE_URL!

type QueryInTransaction<T> = (
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) => Promise<T>;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);

const decodeJwt = (token: string): any => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded?.payload;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

export const rlsQuery = async <T>(
  session: Session,
  txFunc: QueryInTransaction<T>
) => {
  try {
    const jwtClaim = decodeJwt(session.access_token)

    if (!jwtClaim) {
      return { error: 'Invalid JWT Token' }
    }

    const role = jwtClaim.role;

    return await db.transaction(async (tx) => {
      await tx.execute(
        sql`SELECT set_config('request.jwt.claims', ${JSON.stringify(jwtClaim)}, TRUE)`
      );

      // Set role to authenticated to utilize RLS policies correctly
      await tx.execute(
        sql`SET ROLE ${sql.identifier(role)}`
      );

      return await txFunc(tx);
    });
  } catch (e) {
    console.error(e);
    return { error: 'Failed to execute query' }
  }
}
