const query = `
--
-- File generated with SQLiteStudio v3.2.1 on mié oct 7 13:43:55 2020
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: books
DROP TABLE IF EXISTS books;
CREATE TABLE books (
	book_number NUMERIC NOT NULL, 
	short_name TEXT NOT NULL, 
	long_name TEXT NOT NULL, 
	book_color TEXT NOT NULL, 
	PRIMARY KEY (book_number));
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (10, 'Gn', 'Génesis', '#ccccff');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (20, 'Éx', 'Éxodo', '#ccccff');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (30, 'Lv', 'Levítico', '#ccccff');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (40, 'Nm', 'Números', '#ccccff');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (50, 'Dt', 'Deuteronomio', '#ccccff');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (60, 'Jos', 'Josué', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (70, 'Jue', 'Jueces', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (80, 'Rt', 'Rut', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (90, '1S', '1 Samuel', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (100, '2S', '2 Samuel', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (110, '1R', '1 Reyes', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (120, '2R', '2 Reyes', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (130, '1Cr', '1 Crónicas', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (140, '2Cr', '2 Crónicas', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (150, 'Esd', 'Esdras', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (160, 'Ne', 'Nehemías', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (190, 'Est', 'Ester', '#ffcc99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (220, 'Job', 'Job', '#66ff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (230, 'Sal', 'Salmos', '#66ff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (240, 'Pr', 'Proverbios', '#66ff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (250, 'Ec', 'Eclesiastés', '#66ff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (260, 'Cnt', 'Cantares', '#66ff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (290, 'Is', 'Isaías', '#ff9fb4');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (300, 'Jr', 'Jeremías', '#ff9fb4');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (310, 'Lm', 'Lamentaciones', '#ff9fb4');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (330, 'Ez', 'Ezequiel', '#ff9fb4');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (340, 'Dn', 'Daniel', '#ff9fb4');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (350, 'Os', 'Oseas', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (360, 'Jl', 'Joel', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (370, 'Am', 'Amós', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (380, 'Abd', 'Abdías', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (390, 'Jon', 'Jonás', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (400, 'Mi', 'Miqueas', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (410, 'Nah', 'Nahúm', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (420, 'Hab', 'Habacuc', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (430, 'Sof', 'Sofonías', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (440, 'Hag', 'Hageo', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (450, 'Zac', 'Zacarías', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (460, 'Mal', 'Malaquías', '#ffff99');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (470, 'Mt', 'Mateo', '#ff6600');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (480, 'Mr', 'Marcos', '#ff6600');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (490, 'Lc', 'Lucas', '#ff6600');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (500, 'Jn', 'Juan', '#ff6600');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (510, 'Hch', 'Hechos', '#00ffff');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (520, 'Ro', 'Romanos', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (530, '1Co', '1 Corintios', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (540, '2Co', '2 Corintios', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (550, 'Gl', 'Gálatas', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (560, 'Ef', 'Efesios', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (570, 'Flp', 'Filipenses', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (580, 'Col', 'Colosenses', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (590, '1Ts', '1 Tesalonicenses', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (600, '2Ts', '2 Tesalonicenses', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (610, '1Tm', '1 Timoteo', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (620, '2Tm', '2 Timoteo', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (630, 'Tit', 'Tito', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (640, 'Flm', 'Filemón', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (650, 'Heb', 'Hebreos', '#ffff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (660, 'Stg', 'Santiago', '#00ff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (670, '1P', '1 Pedro', '#00ff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (680, '2P', '2 Pedro', '#00ff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (690, '1Jn', '1 Juan', '#00ff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (700, '2Jn', '2 Juan', '#00ff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (710, '3Jn', '3 Juan', '#00ff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (720, 'Jud', 'Judas', '#00ff00');
INSERT INTO books (book_number, short_name, long_name, book_color) VALUES (730, 'Ap', 'Apocalipsis', '#ff7c80');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;`

export default query;