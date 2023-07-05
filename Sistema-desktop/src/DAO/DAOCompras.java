package DAO;

import model.ModelCompras;
import conexoes.ConexaoMySql;
import java.util.ArrayList;
/**
*
* @author André
*/
public class DAOCompras extends ConexaoMySql {

    /**
    * grava Compras
    * @param pModelCompras
    * @return int
    */
    public int salvarComprasDAO(ModelCompras pModelCompras){
        try {
            this.conectar();
            return this.insertSQL(
                "INSERT INTO tbl_compras ("
                    + "fk_fornecedor,"
                    + "com_data_compra,"
                    + "com_valor_liquido,"
                    + "com_valor_bruto,"
                    + "com_desconto"
                + ") VALUES ("
                    + "'" + pModelCompras.getFornecedor() + "',"
                    + "'" + pModelCompras.getComDataCompra() + "',"
                    + "'" + pModelCompras.getComValorLiquido() + "',"
                    + "'" + pModelCompras.getComValorBruto() + "',"
                    + "'" + pModelCompras.getComDesconto() + "'"
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
    * recupera Compras
    * @param pIdCompra
    * @return ModelCompras
    */
    public ModelCompras getComprasDAO(int pIdCompra){
        ModelCompras modelCompras = new ModelCompras();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_compra,"
                    + "fk_fornecedor,"
                    + "com_data_compra,"
                    + "com_valor_liquido,"
                    + "com_valor_bruto,"
                    + "com_desconto"
                 + " FROM"
                     + " tbl_compras"
                 + " WHERE"
                     + " pk_id_compra = '" + pIdCompra + "'"
                + ";"
            );

            while(this.getResultSet().next()){
                modelCompras.setIdCompra(this.getResultSet().getInt(1));
                modelCompras.setFornecedor(this.getResultSet().getInt(2));
                modelCompras.setComDataCompra(this.getResultSet().getDate(3));
                modelCompras.setComValorLiquido(this.getResultSet().getDouble(4));
                modelCompras.setComValorBruto(this.getResultSet().getDouble(5));
                modelCompras.setComDesconto(this.getResultSet().getDouble(6));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return modelCompras;
    }

    /**
    * recupera uma lista de Compras
        * @return ArrayList
    */
    public ArrayList<ModelCompras> getListaComprasDAO(){
        ArrayList<ModelCompras> listamodelCompras = new ArrayList();
        ModelCompras modelCompras = new ModelCompras();
        try {
            this.conectar();
            this.executarSQL(
                "SELECT "
                    + "pk_id_compra,"
                    + "fk_fornecedor,"
                    + "com_data_compra,"
                    + "com_valor_liquido,"
                    + "com_valor_bruto,"
                    + "com_desconto"
                 + " FROM"
                     + " tbl_compras"
                + ";"
            );

            while(this.getResultSet().next()){
                modelCompras = new ModelCompras();
                modelCompras.setIdCompra(this.getResultSet().getInt(1));
                modelCompras.setFornecedor(this.getResultSet().getInt(2));
                modelCompras.setComDataCompra(this.getResultSet().getDate(3));
                modelCompras.setComValorLiquido(this.getResultSet().getDouble(4));
                modelCompras.setComValorBruto(this.getResultSet().getDouble(5));
                modelCompras.setComDesconto(this.getResultSet().getDouble(6));
                listamodelCompras.add(modelCompras);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            this.fecharConexao();
        }
        return listamodelCompras;
    }

    /**
    * atualiza Compras
    * @param pModelCompras
    * @return boolean
    */
    public boolean atualizarComprasDAO(ModelCompras pModelCompras){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "UPDATE tbl_compras SET "
                    + "pk_id_compra = '" + pModelCompras.getIdCompra() + "',"
                    + "fk_fornecedor = '" + pModelCompras.getFornecedor() + "',"
                    + "com_data_compra = '" + pModelCompras.getComDataCompra() + "',"
                    + "com_valor_liquido = '" + pModelCompras.getComValorLiquido() + "',"
                    + "com_valor_bruto = '" + pModelCompras.getComValorBruto() + "',"
                    + "com_desconto = '" + pModelCompras.getComDesconto() + "'"
                + " WHERE "
                    + "pk_id_compra = '" + pModelCompras.getIdCompra() + "'"
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
    * exclui Compras
    * @param pIdCompra
    * @return boolean
    */
    public boolean excluirComprasDAO(int pIdCompra){
        try {
            this.conectar();
            return this.executarUpdateDeleteSQL(
                "DELETE FROM tbl_compras "
                + " WHERE "
                    + "pk_id_compra = '" + pIdCompra + "'"
                + ";"
            );
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }finally{
            this.fecharConexao();
        }
    }
}