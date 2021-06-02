const connectionData = require('../conection.js');

module.exports = {
    async insert(nombre, detalle){
        let result = await connectionData.query(`insert into posts
            (nombre, detalle)
            values
            ($1, $2)`, [nombre, detalle]);
        return result;
    },
    async getAll(){
        const result = await connectionData.query("select id, nombre, detalle from posts");
        return result.rows;
    },
    async delete(id){
        const result = connectionData.query(`delete from posts
            where id = $1`, [id]);
        return result;
    }
}