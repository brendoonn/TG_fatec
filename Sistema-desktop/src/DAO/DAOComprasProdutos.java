package DAO;

import conexoes.ConexaoMySql;
import java.util.ArrayList;
import model.ModelComprasProdutos;
/**
*
* @author André
*/
public class DAOComprasProdutos extends ConexaoMySql {

    /**
    * grava ComprasProdutos
    * @param pModelComprasProdutos
    * @return int
    */
    public int salvarComprasProdutosDAO(ModelComprasProdutos pModelComprasProdutos){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_compras_produtos ("
                    + "fk_produto,"
                    + "fk_compras,"
                    + "com_pro_valor,"
                    + "com_pro_quantidade"
                + ") VALUES ("
                    + "'" + pModelComprasProdutos.getProduto() + "',"
                    + "'" + pModelComprasProdutos.getCompras() + "',"
                    + "'" + pModelComprasProdutos.getComProValor() + "',"
                    + "'" + pModelComprasProdutos.getComProQuantidade() + "'"
                + ");"
            );
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }finally{
            this.fecharConexao();
        }
    }

    /**
    * recupera ComprasProdutos
    * @param pIdCompraProduto
    * @return ModelComprasProdutos
    */
    public ModelComprasProdutos getComprasProdutosDAO(int pIdCompraProduto){
        ModelComprasProdutos modelComprasProdutos = new ModelComprasProdutos();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_compra_produto,"
                    + "fk_produto,"
                    + "fk_compras,"
                    + "com_pro_valor,"
                    + "com_pro_quantidade"
                 + " FROM"
                     + " tbl_compras_produtos"
                 + " WHERE"
                     + " pk_id_compra_produto = '" + pIdCompraProduto + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelComprasProdutos.setIdCompraProduto(this.getResultSet().getInt(1));
                modelComprasProdutos.setProduto(this.getResultSet().getInt(2));
                modelComprasProdutos.setCompras(this.getResultSet().getInt(3));
                modelComprasProdutos.setComProValor(this.getResultSet().getDouble(4));
                modelComprasProdutos.setComProQuantidade(this.getResultSet().getDouble(5));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelComprasProdutos;
    }

    /**
    * recupera uma lista de ComprasProdutos
        * @return ArrayList
    */
    public ArrayList<ModelComprasProdutos> getListaComprasProdutosDAO(){
        ArrayList<ModelComprasProdutos> listamodelComprasProdutos = new ArrayList();
        ModelComprasProdutos modelComprasProdutos = new ModelComprasProdutos();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_compra_produto,"
                    + "fk_produto,"
                    + "fk_compras,"
                    + "com_pro_valor,"
                    + "com_pro_quantidade"
                 + " FROM"
                     + " tbl_compras_produtos"
                + ";"
            );

            while(this.getResultSet().next()){
                modelComprasProdutos = new ModelComprasProdutos();
                modelComprasProdutos.setIdCompraProduto(this.getResultSet().getInt(1));
                modelComprasProdutos.setProduto(this.getResultSet().getInt(2));
                modelComprasProdutos.setCompras(this.getResultSet().getInt(3));
                modelComprasProdutos.setComProValor(this.getResultSet().getDouble(4));
                modelComprasProdutos.setComProQuantidade(this.getResultSet().getDouble(5));
                listamodelComprasProdutos.add(modelComprasProdutos);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelComprasProdutos;
    }

    /**
    * atualiza ComprasProdutos
    * @param pModelComprasProdutos
    * @return boolean
    */
    public boolean atualizarComprasProdutosDAO(ModelComprasProdutos pModelComprasProdutos){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_compras_produtos SET "
                    + "pk_id_compra_produto = '" + pModelComprasProdutos.getIdCompraProduto() + "',"
                    + "fk_produto = '" + pModelComprasProdutos.getProduto() + "',"
                    + "fk_compras = '" + pModelComprasProdutos.getCompras() + "',"
                    + "com_pro_valor = '" + pModelComprasProdutos.getComProValor() + "',"
                    + "com_pro_quantidade = '" + pModelComprasProdutos.getComProQuantidade() + "'"
                + " WHERE "
                    + "pk_id_compra_produto = '" + pModelComprasProdutos.getIdCompraProduto() + "'"
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }

    /**
    * exclui ComprasProdutos
    * @param pIdCompraProduto
    * @return boolean
    */
    public boolean excluirComprasProdutosDAO(int pIdCompraProduto){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_compras_produtos "
                + " WHERE "
                    + "pk_id_compra_produto = '" + pIdCompraProduto + "'"
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }

     /**
     * Salvar uma lista de produtos da compra
     * @param pListaModelComprasProdutos
     * @return 
     */
    public boolean salvarComprasProdutosDAO(ArrayList<ModelComprasProdutos> pListaModelComprasProdutos) {
        try {
            this.conectar();
            int cont = pListaModelComprasProdutos.size();
            for (int i = 0; i < cont; i++) {
                this.insertSQL(
                        "INSERT INTO tbl_compras_produtos ("
                        + "fk_compras,"
                        + "fk_produto,"
                        + "com_pro_valor,"
                        + "com_pro_quantidade"
                        + ") VALUES ("
                        + "'" + pListaModelComprasProdutos.get(i).getCompras() + "',"
                        + "'" + pListaModelComprasProdutos.get(i).getProduto()+ "',"
                        + "'" + pListaModelComprasProdutos.get(i).getComProValor() + "',"
                        + "'" + pListaModelComprasProdutos.get(i).getComProQuantidade() + "'"
                        + ");"
                );
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            this.fecharConexao();
        }
    }
}