import IDataTesting from "../interfaces/data-testing-interface";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export const resolvers = {
  Query: {
    user: (_: void, args: any) => {
      const { id } = args;
    },
    data: async (
      _: void,
      args: any,
      context: { db: Connection }
    ): Promise<IDataTesting[]> => {
      try {
        const results = await new Promise<any[]>((resolve, reject) => {
          context.db.query(
            "SELECT * FROM data_testing",
            (error, results: any) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });
        if (Array.isArray(results) && results.length > 0) {
          const mappedUsers: IDataTesting[] = results.map((row: any) => {
            return {
              cabeza1: row.cabeza1,
              cabeza2: row.cabeza2,
              cabeza3: row.cabeza3,
              cabeza4: row.cabeza4,
              registerDate: row.registerDate,
            };
          });
          return mappedUsers;
        } else {
          return [];
        }
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
  },
};
