/*
  Warnings:

  - You are about to drop the `_GenreToSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_GenreToSong_B_index";

-- DropIndex
DROP INDEX "_GenreToSong_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GenreToSong";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mediaPath" TEXT NOT NULL,
    "mediaHash" TEXT NOT NULL,
    "track" INTEGER,
    "duration" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "genreId" INTEGER,
    CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Song_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("albumId", "artistId", "duration", "id", "mediaHash", "mediaPath", "title", "track") SELECT "albumId", "artistId", "duration", "id", "mediaHash", "mediaPath", "title", "track" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
CREATE UNIQUE INDEX "Song_mediaHash_key" ON "Song"("mediaHash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
