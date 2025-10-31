import { connection } from "../infra/connection";

export type User = {
    id?: number
    nome: string;
    email: string;
    senha: string;
    data_criacao?: string;
}

export async function insert(user: User) {
    await connection.query(
        'INSERT INTO users(nome, email, senha) VALUES ($1, $2, $3);',
        [
            user.nome,
            user.email,
            user.senha
        ]
    );
} //CREATE

export async function getAll() {
    const { rows } = await connection.query(
        'SELECT * FROM users;'
    ); 
    return rows;
} //READ

export async function updateById(user: User) {
    await connection.query(
        `UPDATE users
        SET nome=$1, senha=$2, email=$3,
        WHERE id =$4;`,
        [
            user.nome,
            user.senha,
            user.id
        ]
    );
} //UPDATE

export async function deleteById(id: string) {
    await connection.query(
        'DELETE FROM users WHERE id=$1', [id]
    );
} //DELETE

export async function getById(id: string) {
    const { rows } = await connection.query(
        `SELECT * FROM users
        WHERE id=$1`,
        [id]
    );
    return rows[0];

}
 // essa função busca um usuário no banco

export async function getByEmail(email: string) {
    const { rows } = await connection.query(
        `SELECT * FROM users
        WHERE email=$1`,
        [email]
    );
    return rows[0];
}

export async function getByEmailAndPassword(email: string, senha: string) {
    const { rows } = await connection.query(
        `SELECT * FROM users
        WHERE email=$1 and senha=$2`,
        [email, senha]
    );
    return rows[0];
}