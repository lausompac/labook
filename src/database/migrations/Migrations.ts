import { BaseDatabase } from "../BaseDatabase";
import { PostDatabase } from "../PostDatabase";
import { UserDatabase } from "../UserDatabase";
import { posts, users } from "./data";


class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables...");
            await this.createTables();
            console.log("Tables created!");

            console.log("Populating tables...");
            await this.insertData();
            console.log("Tables populated!");

            console.log("Migration finished!");
        }
        catch (error) {
            console.log("Error in migrations");
            console.log(error.message);
        } finally {
            console.log("Ending connection...");
            BaseDatabase.connection.destroy();
            console.log("Connection ended!");
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS 
            ${PostDatabase.TABLE_LIKE},
            ${PostDatabase.TABLE_POST},
            ${UserDatabase.TABLE_USERS};

        CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS} (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") NOT NULL DEFAULT "NORMAL"
        );
        
        CREATE TABLE IF NOT EXISTS ${PostDatabase.TABLE_POST} (
            id VARCHAR(255) PRIMARY KEY,
            text VARCHAR(255) NOT NULL,
            creator_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (creator_id) REFERENCES ${UserDatabase.TABLE_USERS}(id) ON DELETE CASCADE,
            likes INT NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS ${PostDatabase.TABLE_LIKE} (
            post_id VARCHAR(255),
            FOREIGN KEY (post_id) REFERENCES ${PostDatabase.TABLE_POST}(id) ON DELETE CASCADE,
            user_id VARCHAR(255) UNIQUE, 
            FOREIGN KEY (user_id) REFERENCES ${UserDatabase.TABLE_USERS}(id) ON DELETE CASCADE
        );
        `)
    }

    insertData = async () => { 
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(users)

        await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .insert(posts)
    }
}

const migrations = new Migrations();
migrations.execute();
