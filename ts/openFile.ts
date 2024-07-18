import * as fs from 'node:fs';

export class FileStruct {
	public path: Readonly<string>;
	public encoding: Readonly<BufferEncoding>;
	public content: Readonly<string>;

	constructor(path: string, encoding: BufferEncoding, content?: string) {
		this.path = path;
		this.encoding = encoding
		this.content = content ? content : '';
	}
}

export default class OpenFile {
	private path: Readonly<string>; // Caminho do arquivo para leitura.
	private encoding: Readonly<BufferEncoding>; // Encoding para analizes futuras.
	private content: Readonly<string>; // Conteudo para leitura.

	constructor(path: string, encoding: BufferEncoding) {
		this.path = path;
		this.encoding = encoding;
		try {
			// No caso de sucesso ao abrir o arquivo, OpenFile.content receberá o conteudo do arquivo.
			this.content = fs.readFileSync(path, encoding);
		} catch (err) {
			// No caso de algum erro inesperado, receberá string 'error'.
			this.content = "!";
		}
	}

	// Todas as propriedades são privadas, então retornamos em forma de FileStruct.
	public getFileStruct(): FileStruct {
		return new FileStruct( this.path, this.encoding, this.content );
	}
}