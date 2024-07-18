import Database, { Database as SQLiteDatabase } from 'better-sqlite3';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Interface para o cliente
interface Client {
	name: string;
	age: number;
}

// Função para conectar ao banco de dados
function connect(dbPath: string): SQLiteDatabase {
	const db = new Database(dbPath, { verbose: console.log }) as SQLiteDatabase;

	// Cria a tabela se não existir
	db.exec(`
		CREATE TABLE IF NOT EXISTS client_node (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
	    	username TEXT NOT NULL,
	    	age INTEGER NOT NULL
		)
	`);

	return db;
}

// Função para selecionar todos os registros de uma tabela
function selectAll(db: SQLiteDatabase, select: string = '*', from: string): any[] {
	const query = `SELECT ${select} FROM ${from}` as string;
	const rows = db.prepare(query).all();
	return rows;
}

// Função para adicionar um novo cliente na tabela
function addClient(db: SQLiteDatabase, client: Client): void {
	try {
		// Inicia uma transação
		const insert = db.prepare(`INSERT INTO client_node (username, age) VALUES (?, ?)`);
		insert.run(client.name, client.age);
		console.log('Cliente adicionado com sucesso!');
	} catch (error) {
		console.error('Erro ao adicionar cliente:', error);
	}
}

// Função para fechar a conexão
function close(db: SQLiteDatabase): void {
	db.close();
}

export default connect;
export { selectAll, addClient, close, Client };
